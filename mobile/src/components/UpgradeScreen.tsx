import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, ScrollView, Platform } from 'react-native';
import { Crown, CheckCircle2, X, Star, Zap, ChefHat } from 'lucide-react-native';

const { width, height: screenHeight } = Dimensions.get('window');

interface UpgradeScreenProps {
  onClose: () => void;
}

export const UpgradeScreen = ({ onClose }: UpgradeScreenProps) => {
  const slideUp = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    Animated.spring(slideUp, {
      toValue: 0,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, []);

  const handleClose = () => {
    Animated.timing(slideUp, {
      toValue: screenHeight,
      duration: 250,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.container, { transform: [{ translateY: slideUp }] }]}>
        
        {/* Fixed Header */}
        <View style={styles.header}>
           <View style={styles.headerDeco} />
           <Crown size={48} color="#fff" fill="#f59e0b" style={styles.crownIcon} />
           <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
              <X size={24} color="#fff" />
           </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollContainer} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
           <View style={styles.titleContainer}>
              <Text style={styles.title}>KOUL <Text style={{color: '#f59e0b'}}>Premium</Text></Text>
              <Text style={styles.subtitle}>Walli M3allem fi Makeltek!</Text>
           </View>

           <View style={styles.featuresList}>
              <View style={styles.featureRow}>
                 <View style={[styles.iconBox, { backgroundColor: '#fff7ed' }]}>
                    <ChefHat size={20} color="#f97316" />
                 </View>
                 <View style={{ flex: 1 }}>
                    <Text style={styles.featureTitle}>El Menu el Sahri ✨</Text>
                    <Text style={styles.featureDesc}>Recettes bil 9adhya elli 3andek fel frijider.</Text>
                 </View>
              </View>

              <View style={styles.featureRow}>
                 <View style={[styles.iconBox, { backgroundColor: '#ecfdf5' }]}>
                    <Zap size={20} color="#10b981" />
                 </View>
                 <View style={{ flex: 1 }}>
                    <Text style={styles.featureTitle}>Coach Personnel (IA) 🤖</Text>
                    <Text style={styles.featureDesc}>Es2el 'Amel' ay wa9t: "Chnowa ntayeb lyoum?"</Text>
                 </View>
              </View>

              <View style={styles.featureRow}>
                 <View style={[styles.iconBox, { backgroundColor: '#eff6ff' }]}>
                    <Star size={20} color="#3b82f6" />
                 </View>
                 <View style={{ flex: 1 }}>
                    <Text style={styles.featureTitle}>Scan el 9adhya 🛒</Text>
                    <Text style={styles.featureDesc}>A3ref el produit el ghali w el rkhis w el s7i.</Text>
                 </View>
              </View>
           </View>

           <View style={styles.pricingContainer}>
              <Text style={styles.priceLabel}>A partir de</Text>
              <View style={styles.priceRow}>
                 <Text style={styles.currency}>TND</Text>
                 <Text style={styles.price}>5</Text>
                 <Text style={styles.period}>/ Ch'har</Text>
              </View>
              <Text style={styles.cancelAnytime}>Tnajem tbatel wa9t ma t7eb</Text>
           </View>

           <TouchableOpacity style={styles.upgradeBtn} onPress={() => {}}>
              <Text style={styles.upgradeBtnText}>Abda 7 Jours Gratuit</Text>
           </TouchableOpacity>
           
           <View style={{ height: 40 }} />
        </ScrollView>

      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: '90%', // Increased height
    overflow: 'hidden',
  },
  header: {
    height: 140,
    backgroundColor: '#18181b',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerDeco: {
    position: 'absolute',
    top: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
  },
  crownIcon: {
    shadowColor: '#f59e0b',
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#18181b',
  },
  subtitle: {
    fontSize: 16,
    color: '#71717a',
    marginTop: 4,
    fontWeight: '500',
  },
  featuresList: {
    gap: 20,
    marginBottom: 32,
  },
  featureRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f4f4f5',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#18181b',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 12,
    color: '#71717a',
    lineHeight: 18,
  },
  pricingContainer: {
    alignItems: 'center',
    backgroundColor: '#fffbeb',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#fcd34d',
    marginBottom: 24,
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#d97706',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  currency: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#18181b',
    marginBottom: 6,
  },
  price: {
    fontSize: 48,
    fontWeight: '900',
    color: '#18181b',
    lineHeight: 54,
  },
  period: {
    fontSize: 16,
    fontWeight: '600',
    color: '#71717a',
    marginBottom: 10,
  },
  cancelAnytime: {
    fontSize: 12,
    color: '#a1a1aa',
    marginTop: 4,
  },
  upgradeBtn: {
    backgroundColor: '#18181b',
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  upgradeBtnText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
  },
});
