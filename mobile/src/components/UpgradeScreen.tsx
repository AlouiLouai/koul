import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, ScrollView } from 'react-native';
import { Crown, CheckCircle2, X, Star, Zap, ChefHat } from 'lucide-react-native';
import { GlassView } from './GlassView';
import { useTheme } from '../theme/ThemeContext';

const { width, height: screenHeight } = Dimensions.get('window');

interface UpgradeScreenProps {
  onClose: () => void;
  onUpgrade: () => void;
}

export const UpgradeScreen = ({ onClose, onUpgrade }: UpgradeScreenProps) => {
  const slideUp = useRef(new Animated.Value(screenHeight)).current;
  const { colors, mode } = useTheme();

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
      <Animated.View style={[styles.containerWrapper, { transform: [{ translateY: slideUp }] }]}>
        <GlassView style={styles.container} intensity={95} borderRadius={32} noBorder>
            
            {/* Fixed Header */}
            <View style={[styles.header, { backgroundColor: colors.mode === 'dark' ? '#00000080' : '#18181b' }]}>
               <View style={[styles.headerDeco, { backgroundColor: colors.warning + '30' }]} />
               <Crown size={48} color="#fff" fill={colors.warning} style={styles.crownIcon} />
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
                  <Text style={[styles.title, { color: colors.text }]}>KOUL <Text style={{color: colors.warning}}>Premium</Text></Text>
                  <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Walli M3allem fi Makeltek!</Text>
               </View>

               <View style={styles.featuresList}>
                  <GlassView style={styles.featureRow} intensity={40} borderRadius={20}>
                     <View style={[styles.iconBox, { backgroundColor: colors.warning + '20' }]}>
                        <ChefHat size={20} color={colors.warning} />
                     </View>
                     <View style={{ flex: 1 }}>
                        <Text style={[styles.featureTitle, { color: colors.text }]}>El Menu el Sahri ✨</Text>
                        <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>Recettes bil 9adhya elli 3andek fel frijider.</Text>
                     </View>
                  </GlassView>

                  <GlassView style={styles.featureRow} intensity={40} borderRadius={20}>
                     <View style={[styles.iconBox, { backgroundColor: colors.primary + '20' }]}>
                        <Zap size={20} color={colors.primary} />
                     </View>
                     <View style={{ flex: 1 }}>
                        <Text style={[styles.featureTitle, { color: colors.text }]}>Coach Personnel (IA) 🤖</Text>
                        <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>Es2el 'Amel' ay wa9t: "Chnowa ntayeb lyoum?"</Text>
                     </View>
                  </GlassView>

                  <GlassView style={styles.featureRow} intensity={40} borderRadius={20}>
                     <View style={[styles.iconBox, { backgroundColor: colors.success + '20' }]}>
                        <Star size={20} color={colors.success} />
                     </View>
                     <View style={{ flex: 1 }}>
                        <Text style={[styles.featureTitle, { color: colors.text }]}>Scan el 9adhya 🛒</Text>
                        <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>A3ref el produit el ghali w el rkhis w el s7i.</Text>
                     </View>
                  </GlassView>
               </View>

               <GlassView style={[styles.pricingContainer, { borderColor: colors.primary }]} intensity={30} borderRadius={24}>
                  <Text style={[styles.priceLabel, { color: colors.primary }]}>A partir de</Text>
                  <View style={styles.priceRow}>
                     <Text style={[styles.currency, { color: colors.text }]}>TND</Text>
                     <Text style={[styles.price, { color: colors.text }]}>5</Text>
                     <Text style={[styles.period, { color: colors.textSecondary }]}>/ Ch'har</Text>
                  </View>
                  <Text style={[styles.cancelAnytime, { color: colors.textSecondary }]}>Tnajem tbatel wa9t ma t7eb</Text>
               </GlassView>

               <TouchableOpacity 
                  style={[styles.upgradeBtn, { backgroundColor: colors.primary }]} 
                  onPress={onUpgrade}
                  activeOpacity={0.8}
               >
                  <Text style={styles.upgradeBtnText}>Abda 7 Jours Gratuit</Text>
               </TouchableOpacity>
               
               <View style={{ height: 40 }} />
            </ScrollView>

        </GlassView>
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
  containerWrapper: {
    height: '90%',
    width: '100%',
  },
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  header: {
    height: 140,
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
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: '500',
  },
  featuresList: {
    gap: 16,
    marginBottom: 32,
  },
  featureRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
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
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 12,
    lineHeight: 18,
  },
  pricingContainer: {
    alignItems: 'center',
    padding: 20,
    borderWidth: 2,
    marginBottom: 24,
  },
  priceLabel: {
    fontSize: 12,
    fontWeight: 'bold',
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
    marginBottom: 6,
  },
  price: {
    fontSize: 48,
    fontWeight: '900',
    lineHeight: 54,
  },
  period: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  cancelAnytime: {
    fontSize: 12,
    marginTop: 4,
  },
  upgradeBtn: {
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
