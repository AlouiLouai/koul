import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Lock, Crown, X } from 'lucide-react-native';

interface QuotaExceededModalProps {
  visible: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export const QuotaExceededModal = ({ visible, onClose, onUpgrade }: QuotaExceededModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <X size={20} color="#a1a1aa" />
          </TouchableOpacity>

          <View style={styles.iconBg}>
             <Lock size={40} color="#f59e0b" strokeWidth={2.5} />
             <View style={styles.badge}>
                <Crown size={12} color="#fff" fill="#fff" />
             </View>
          </View>

          <Text style={styles.title}>Kammalt l'Quota! 🛑</Text>
          <Text style={styles.message}>
            Yezzi ma sawart lyoum! 3 scans/jour houa l'limit mta3ek.
            
            <Text style={styles.highlight}>Walli Premium</Text> bach t7allel makletek bla 7seb.
          </Text>

          <TouchableOpacity style={styles.upgradeBtn} onPress={() => { onClose(); onUpgrade(); }}>
             <Text style={styles.upgradeBtnText}>Walli Premium (5 TND)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
             <Text style={styles.cancelBtnText}>Batel, ghodwa nkamal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  container: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 10,
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 4,
  },
  iconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fffbeb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#fcd34d',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#10b981',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#18181b',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#71717a',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  highlight: {
    color: '#10b981',
    fontWeight: 'bold',
  },
  upgradeBtn: {
    width: '100%',
    backgroundColor: '#18181b',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#f59e0b',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  upgradeBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelBtn: {
    paddingVertical: 12,
  },
  cancelBtnText: {
    color: '#a1a1aa',
    fontWeight: '600',
    fontSize: 14,
  },
});
