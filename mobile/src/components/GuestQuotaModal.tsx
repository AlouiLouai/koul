import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { UserPlus, Sparkles, X } from 'lucide-react-native';

interface GuestQuotaModalProps {
  visible: boolean;
  onClose: () => void;
  onConnect: () => void;
}

export const GuestQuotaModal = ({ visible, onClose, onConnect }: GuestQuotaModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <X size={20} color="#a1a1aa" />
          </TouchableOpacity>

          <View style={styles.iconBg}>
             <UserPlus size={36} color="#2563eb" strokeWidth={2.5} />
             <View style={styles.badge}>
                <Sparkles size={12} color="#fff" fill="#fff" />
             </View>
          </View>

          <Text style={styles.title}>Wfet l'tjarib! 🛑</Text>
          <Text style={styles.message}>
            Kammalt l'3 scans mta3ek l'youm. 
            
            <Text style={styles.highlight}>Connecti</Text> tawa bach t7afedh 3la tsawrek w stats mta3ek!
          </Text>

          <TouchableOpacity style={styles.connectBtn} onPress={() => { onClose(); onConnect(); }}>
             <Text style={styles.connectBtnText}>Connecti Tawa</Text>
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
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#bfdbfe',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3b82f6',
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
    color: '#2563eb',
    fontWeight: 'bold',
  },
  connectBtn: {
    width: '100%',
    backgroundColor: '#2563eb',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#2563eb',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  connectBtnText: {
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