/**
 * Chat Screen
 * Chat with Sebastian the butler
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootState } from '@store/store';
import { addUserMessage, updateLastReply } from '@store/slices/chatSlice';
import { theme } from '@theme/theme';
import { Title, Body, Caption } from '@components/common/Typography';
import { SebastianMessage } from '@components/sebastian/SebastianMessage';

const ChatScreen: React.FC = () => {
  const { t } = useTranslation(['common', 'sebastian']);
  const dispatch = useDispatch();
  const scrollViewRef = useRef<ScrollView>(null);

  const { conversations, isTyping } = useSelector(
    (state: RootState) => state.chat
  );
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { todayTotal: waterTotal } = useSelector((state: RootState) => state.water);
  const { todayTotal: fiberTotal } = useSelector((state: RootState) => state.meal);

  const [message, setMessage] = useState('');

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [conversations, isTyping]);

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(addUserMessage(message));

      // Simulate Sebastian's response (in real app, this would call LLM API)
      setTimeout(() => {
        const sebastianReply = generateSebastianReply(
          message,
          waterTotal,
          fiberTotal
        );
        dispatch(updateLastReply(sebastianReply));
      }, 1500);

      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        {/* Header */}
        <View style={styles.header}>
          <Icon
            name="chat-outline"
            size={24}
            color={theme.colors.primary.gold}
          />
          <Title style={styles.headerTitle}>Sebastian과 대화</Title>
        </View>

        {/* Chat Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {conversations.length === 0 && (
            <View style={styles.emptyState}>
              <Icon
                name="account-tie"
                size={64}
                color={theme.colors.primary.gold}
              />
              <Body style={styles.emptyText}>
                {t('sebastian:chat.placeholder')}
              </Body>
            </View>
          )}

          {conversations.map((conv, index) => (
            <View key={conv.id}>
              {/* User Message */}
              {conv.userMessage && (
                <View style={styles.userMessageContainer}>
                  <View style={styles.userBubble}>
                    <Body style={styles.userMessageText}>
                      {conv.userMessage}
                    </Body>
                  </View>
                </View>
              )}

              {/* Sebastian's Reply */}
              {conv.sebastianReply && (
                <SebastianMessage
                  message={conv.sebastianReply}
                  timestamp={conv.timestamp}
                  expression="default"
                />
              )}
            </View>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <View style={styles.typingContainer}>
              <SebastianMessage
                message={t('sebastian:chat.thinking')}
                expression="default"
              />
            </View>
          )}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={t('sebastian:chat.placeholder')}
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !message.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={!message.trim()}>
            <Icon
              name="send"
              size={24}
              color={
                message.trim()
                  ? theme.colors.primary.gold
                  : theme.colors.text.disabled
              }
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Mock Sebastian reply generator (in real app, this would call LLM API)
const generateSebastianReply = (
  userMessage: string,
  waterTotal: number,
  fiberTotal: number
): string => {
  const lowerMessage = userMessage.toLowerCase();

  // Water related
  if (lowerMessage.includes('물') || lowerMessage.includes('수분')) {
    if (waterTotal < 1000) {
      return '주인님, 오늘 수분 섭취가 부족하십니다. 지금 당장 물 한 잔 드시는 것은 어떠십니까?';
    } else if (waterTotal >= 2000) {
      return '훌륭합니다, 주인님! 오늘 수분 섭취 목표를 달성하셨군요. 대단하십니다.';
    }
    return `주인님께서는 오늘 ${waterTotal}ml의 수분을 섭취하셨습니다. 목표까지 조금 더 노력해주시기 바랍니다.`;
  }

  // Fiber related
  if (lowerMessage.includes('식사') || lowerMessage.includes('섬유')) {
    if (fiberTotal < 10) {
      return '식이섬유 섭취가 부족해 보입니다, 주인님. 채소나 과일을 더 드시는 것을 권해드립니다.';
    }
    return `오늘 ${fiberTotal}g의 식이섬유를 섭취하셨군요. 훌륭한 선택입니다.`;
  }

  // Greeting
  if (
    lowerMessage.includes('안녕') ||
    lowerMessage.includes('hello') ||
    lowerMessage.includes('hi')
  ) {
    return '안녕하십니까, 주인님. Sebastian이 항상 모시고 있습니다. 무엇을 도와드릴까요?';
  }

  // Thanks
  if (lowerMessage.includes('고마') || lowerMessage.includes('감사')) {
    return '과분한 말씀이십니다, 주인님. 귀하의 건강을 돌보는 것이 제 임무입니다.';
  }

  // Encouragement
  if (lowerMessage.includes('힘들') || lowerMessage.includes('피곤')) {
    return '주인님, 충분한 휴식과 수분 섭취가 필요해 보입니다. 건강이 최우선입니다.';
  }

  // Default
  return '주인님의 말씀을 경청했습니다. 귀하의 건강 관리를 위해 최선을 다하겠습니다.';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },

  keyboardView: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
    ...theme.shadows.sm,
  },

  headerTitle: {
    marginLeft: theme.spacing.sm,
    marginBottom: 0,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingVertical: theme.spacing.md,
  },

  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing['3xl'],
  },

  emptyText: {
    marginTop: theme.spacing.lg,
    color: theme.colors.text.light,
    textAlign: 'center',
  },

  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },

  userBubble: {
    maxWidth: '85%',
    backgroundColor: theme.colors.primary.navy,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },

  userMessageText: {
    color: theme.colors.text.inverse,
  },

  typingContainer: {
    opacity: 0.6,
  },

  inputContainer: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
    alignItems: 'flex-end',
  },

  textInput: {
    flex: 1,
    maxHeight: 100,
    minHeight: 44,
    borderWidth: 1,
    borderColor: theme.colors.border.medium,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontFamily: theme.typography.fontFamily.sans,
    fontSize: theme.typography.fontSize.base,
    marginRight: theme.spacing.sm,
  },

  sendButton: {
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary.cream,
  },

  sendButtonDisabled: {
    opacity: theme.opacity.disabled,
  },
});

export default ChatScreen;
