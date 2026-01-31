import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';

interface LogSuccessModalProps {
  visible: boolean;
  onClose: () => void;
  onViewStats: () => void;
}

export const LogSuccessModal = ({ visible, onClose, onViewStats }: LogSuccessModalProps) => {
  if (!visible) return null;

  return (
    <View style={logModalStyles.overlay}>
      <View style={logModalStyles.modalContainer}>
        <View style={logModalStyles.iconBg}>
           <CheckCircle2 size={48} color="#10b981" fill="#ecfdf5" />
        </View>
        <Text style={logModalStyles.title}>Fatourek Tkayed!</Text>
        <Text style={logModalStyles.message}>Taba3 progress mte3ek kol youm bach tousel l'ahdafek.</Text>
        
        <View style={logModalStyles.actions}>
            <TouchableOpacity style={logModalStyles.secondaryBtn} onPress={onClose}>
                <Text style={logModalStyles.secondaryBtnText}>Zid Sawer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={logModalStyles.primaryBtn} onPress={onViewStats}>
                <Text style={logModalStyles.primaryBtnText}>Chouf l'Stats</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const logModalStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 200,
    padding: 24,
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  iconBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ecfdf5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#10b981',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#18181b',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#71717a',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#10b981',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: '#f4f4f5',
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  secondaryBtnText: {
    color: '#71717a',
    fontWeight: 'bold',
    fontSize: 16,
  },
});