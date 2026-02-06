$ErrorActionPreference = "Stop"

$ACR_NAME = "nutriscanapi"
$IMAGE_NAME = "server"
$APP_NAME = "nutriscan-api"
$RESOURCE_GROUP = "rg-nutrition-app"
$TIMESTAMP = Get-Date -Format "yyyyMMddHHmmss"
$FULL_IMAGE_NAME = "$ACR_NAME.azurecr.io/$IMAGE_NAME`:$TIMESTAMP"

Write-Host "Starting Deployment..."
Write-Host "Tag: $TIMESTAMP"

# 1. Check Directory
if (-not (Test-Path "server\Dockerfile")) {
    Write-Error "CRITICAL: server\Dockerfile not found! Are you in the project root?"
    exit 1
}

# 2. Build
Write-Host "Building Docker Image: $FULL_IMAGE_NAME"
# We add --no-cache to force a rebuild and ensure we get the latest prompts
docker build --no-cache -t $FULL_IMAGE_NAME server/

if ($LASTEXITCODE -ne 0) {
    Write-Error "Docker Build Failed!"
    exit 1
}

# 3. Verify Image Exists
$img = docker images -q $FULL_IMAGE_NAME
if (-not $img) {
    Write-Error "CRITICAL: Image was not found after build!"
    exit 1
}

# 4. Login & Push
Write-Host "Logging into ACR..."
az acr login --name $ACR_NAME

Write-Host "Pushing Image..."
docker push $FULL_IMAGE_NAME

if ($LASTEXITCODE -ne 0) {
    Write-Error "Docker Push Failed!"
    exit 1
}

# 5. Clean up Old Revisions
Write-Host "Deactivating Old Revisions..."
$revisions = az containerapp revision list --name $APP_NAME --resource-group $RESOURCE_GROUP --query "[?properties.active==`true`].name" -o tsv

if ($revisions) {
    foreach ($rev in $revisions) {
        Write-Host "Deactivating: $rev"
        az containerapp revision deactivate --name $APP_NAME --resource-group $RESOURCE_GROUP --revision $rev --no-wait
    }
}

# 6. Update Container App
Write-Host "Updating Container App to tag: $TIMESTAMP"
az containerapp update --name $APP_NAME --resource-group $RESOURCE_GROUP --image $FULL_IMAGE_NAME

Write-Host "Deployment Complete!"