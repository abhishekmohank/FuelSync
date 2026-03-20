'use client';

import { FormEvent, useMemo, useState } from 'react';
import { chat } from '@/utils/api';

type ChatRole = 'user' | 'assistant';

interface ChatMessage {
  role: ChatRole;
  content: string;
}

const starterQuestions = [
  'How much protein should I target daily for fat loss?',
  'Create a simple vitamins and minerals checklist for vegetarian meals.',
  'What are signs that my sodium intake is too high?',
  'What nutrients support recovery after workouts?',
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Hi, I am your nutrition assistant. Ask me about nutrients, vitamin/mineral tables, meal planning, and general health-related nutrition questions.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [disclaimer, setDisclaimer] = useState('');

  const canSend = useMemo(() => input.trim().length > 0 && !isSending, [input, isSending]);

  const sendMessage = async (text: string) => {
    const prompt = text.trim();
    if (!prompt || isSending) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: prompt }];
    setMessages(nextMessages);
    setInput('');
    setIsSending(true);
    setError('');

    try {
      const response = await chat.askNutrition(nextMessages);
      const reply = response.data?.reply || 'I could not generate a response. Please try again.';
      const caution = response.data?.disclaimer || '';

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      setDisclaimer(caution);
    } catch (err: any) {
      const message = err?.response?.data?.error || 'Failed to reach nutrition assistant.';
      setError(message);
    } finally {
      setIsSending(false);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await sendMessage(input);
  };

  const userMessageCount = messages.filter((message) => message.role === 'user').length;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-700">FuelSync Assistant</p>
            <h1 className="mt-1 text-xl font-semibold text-gray-900">Nutrition Chat</h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-600">
              Ask clear questions about nutrient targets, vitamin and mineral tables, and practical meal decisions.
            </p>
          </div>

          <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600">
            Nutrition focused
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2 flex flex-col min-h-[600px] border border-gray-200 shadow-sm">
          <div className="mb-4 flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">Session Summary</p>
              <p className="text-xs text-gray-600">{userMessageCount} questions asked</p>
            </div>
            <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              Nutrition Focused
            </div>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto pr-2 max-h-[560px]">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed shadow-sm ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white ml-10'
                    : 'bg-white text-gray-900 mr-10 border border-gray-200'
                }`}
              >
                <p className={`mb-1 text-[11px] uppercase tracking-wide ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.role === 'user' ? 'You' : 'Assistant'}
                </p>
                {message.content}
              </div>
            ))}

            {isSending && (
              <div className="rounded-2xl px-4 py-3 text-sm bg-white text-gray-700 mr-10 border border-gray-200 shadow-sm">
                <p className="mb-1 text-[11px] uppercase tracking-wide text-gray-500">Assistant</p>
                <div className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-pulse" />
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-pulse [animation-delay:150ms]" />
                  <span className="h-2 w-2 rounded-full bg-gray-400 animate-pulse [animation-delay:300ms]" />
                </div>
              </div>
            )}
          </div>

          {error && (
            <p className="text-red-600 text-sm mt-4">{error}</p>
          )}

          <form onSubmit={onSubmit} className="mt-4 flex gap-2 rounded-xl border border-gray-200 bg-white p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about protein targets, vitamin tables, sodium limits, etc."
              className="flex-1 rounded-lg px-4 py-2 outline-none"
            />
            <button
              type="submit"
              disabled={!canSend}
              className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-black disabled:opacity-50"
            >
              Send
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-3">
            For emergencies or diagnosis, contact a licensed medical professional.
          </p>
        </div>

        <div className="space-y-4">
          <div className="card border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Quick Questions</h3>
            <div className="space-y-2">
              {starterQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => sendMessage(question)}
                  disabled={isSending}
                  className="w-full text-left text-sm border border-gray-200 rounded-xl px-3 py-3 hover:bg-gray-50 disabled:opacity-50 transition"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          <div className="card border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Medical Note</h3>
            <p className="text-sm text-gray-700">
              This assistant helps with educational nutrition guidance. It does not replace professional diagnosis or treatment.
            </p>
            {disclaimer && <p className="text-xs text-gray-500 mt-2">{disclaimer}</p>}
          </div>

          <div className="card border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">How To Ask Better</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>Include your goal: fat loss, muscle gain, energy, or recovery.</li>
              <li>Add context: age range, activity level, and dietary preferences.</li>
              <li>Ask for a table format when you want daily nutrient targets.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
