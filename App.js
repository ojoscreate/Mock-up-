import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';

const QUESTION_BANK = {
  Behavioral: [
    "Tell me about a time you disagreed with a teammate. How did you handle it?",
    "Describe a project you're most proud of and why.",
    "Tell me about a time you failed. What did you learn?",
    "How do you handle tight deadlines?",
    "Describe a time you had to learn something new quickly.",
  ],
  Technical: [
    "Explain the difference between state and props in React.",
    "How would you optimize a slow-loading web page?",
    "What is the difference between SQL and NoSQL databases?",
    "Explain how a REST API works.",
    "How do you approach debugging a production issue?",
  ],
  Leadership: [
    "Tell me about a time you led a team through a difficult situation.",
    "How do you handle underperforming team members?",
    "Describe your approach to giving feedback.",
    "Tell me about a decision you made that others disagreed with.",
    "How do you prioritize competing projects?",
  ],
};

const TIME_PER_QUESTION = 90; // seconds

export default function App() {
  const [screen, setScreen] = useState('home'); // 'home' | 'interview' | 'summary'
  const [category, setCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(TIME_PER_QUESTION);
  const [completed, setCompleted] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (screen === 'interview') {
      timerRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(timerRef.current);
            goNext();
            return TIME_PER_QUESTION;
          }
          return s - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, index]);

  const startInterview = (cat) => {
    setCategory(cat);
    setQuestions(QUESTION_BANK[cat]);
    setIndex(0);
    setSecondsLeft(TIME_PER_QUESTION);
    setCompleted(0);
    setScreen('interview');
  };

  const goNext = () => {
    clearInterval(timerRef.current);
    setCompleted((c) => c + 1);
    setIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < questions.length) {
        setSecondsLeft(TIME_PER_QUESTION);
        return nextIndex;
      }
      setScreen('summary');
      return prevIndex;
    });
  };

  const restart = () => {
    clearInterval(timerRef.current);
    setScreen('home');
    setCategory(null);
    setQuestions([]);
    setIndex(0);
    setCompleted(0);
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  if (screen === 'home') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.homeContent}>
          <Text style={styles.title}>Mock Interview</Text>
          <Text style={styles.subtitle}>Pick a category to begin</Text>
          {Object.keys(QUESTION_BANK).map((cat) => (
            <TouchableOpacity
              key={cat}
              style={styles.categoryButton}
              onPress={() => startInterview(cat)}
            >
              <Text style={styles.categoryButtonText}>{cat}</Text>
              <Text style={styles.categoryButtonSub}>
                {QUESTION_BANK[cat].length} questions · {TIME_PER_QUESTION}s each
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'interview') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.interviewHeader}>
          <Text style={styles.progressText}>
            {category} · Question {index + 1} of {questions.length}
          </Text>
          <Text
            style={[
              styles.timerText,
              secondsLeft <= 10 && styles.timerWarning,
            ]}
          >
            {formatTime(secondsLeft)}
          </Text>
        </View>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{questions[index]}</Text>
        </View>
        <Text style={styles.hint}>
          Speak your answer out loud. Tap Next when you're done.
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={restart}>
            <Text style={styles.secondaryButtonText}>Quit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={goNext}>
            <Text style={styles.primaryButtonText}>
              {index + 1 === questions.length ? 'Finish' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // summary
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.homeContent}>
        <Text style={styles.title}>Session Complete</Text>
        <Text style={styles.subtitle}>
          You answered {completed} {category} question
          {completed === 1 ? '' : 's'}.
        </Text>
        <TouchableOpacity style={styles.primaryButton} onPress={restart}>
          <Text style={styles.primaryButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  homeContent: { padding: 24, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: '700', color: '#1A1A2E', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 24 },
  categoryButton: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  categoryButtonText: { fontSize: 18, fontWeight: '600', color: '#1A1A2E' },
  categoryButtonSub: { fontSize: 13, color: '#888', marginTop: 4 },
  interviewHeader: {
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: { fontSize: 14, color: '#666', fontWeight: '500' },
  timerText: { fontSize: 18, fontWeight: '700', color: '#1A1A2E' },
  timerWarning: { color: '#E14434' },
  questionCard: {
    margin: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    minHeight: 160,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  questionText: { fontSize: 20, fontWeight: '600', color: '#1A1A2E', lineHeight: 28 },
  hint: { textAlign: 'center', color: '#999', fontSize: 13, paddingHorizontal: 24 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    marginTop: 'auto',
  },
  primaryButton: {
    backgroundColor: '#4A47F5',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  secondaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  secondaryButtonText: { color: '#666', fontWeight: '600', fontSize: 16 },
});
