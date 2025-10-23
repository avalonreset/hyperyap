import { useEffect, useState } from 'react';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';
import { BookText } from 'lucide-react';
import { invoke } from '@tauri-apps/api/core';
import { toast } from 'sonner';
import { Page } from '@/components/page';
import { Typography } from '@/components/typography';

export const CustomDictionary = () => {
    const [customWords, setCustomWords] = useState<string[]>([]);
    const [newWord, setNewWord] = useState('');

    useEffect(() => {
        invoke<string[]>('get_dictionary').then((words) => {
            setCustomWords(words ?? []);
        });
    }, []);

    const persist = (next: string[]) => {
        setCustomWords(next);
        invoke('set_dictionary', { dictionary: next })
            .then(() => toast.success('Dictionary updated'))
            .catch(() => toast.error('Failed to update dictionary'));
    };

    const handleAddWord = () => {
        const trimmed = newWord.trim();
        if (!trimmed) return;
        if (customWords.includes(trimmed)) return;
        persist([...customWords, trimmed]);
        setNewWord('');
    };

    const handleRemoveWord = (word: string) => {
        const next = customWords.filter((w) => w !== word);
        persist(next);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddWord();
        }
    };

    return (
        <main className="space-y-8">
            <Page.Header>
                <Typography.MainTitle>Custom Dictionary</Typography.MainTitle>
                <Typography.Paragraph className="text-zinc-400">
                    Personalize your Murmure experience by adding technical
                    terms, names, or specialized vocabulary to the dictionary
                    (optimized for both English and French).
                </Typography.Paragraph>
            </Page.Header>

            <div className="space-y-2 w-full">
                <Typography.Title className="space-x-2">
                    <BookText className="w-4 h-4 text-zinc-400 inline-block" />
                    <span>Custom Words</span>
                </Typography.Title>
                <Typography.Paragraph>
                    Add technical terms, names, or specialized vocabulary
                </Typography.Paragraph>
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        value={newWord}
                        onChange={(e) => setNewWord(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add a word"
                    />
                    <Button
                        variant="outline"
                        onClick={handleAddWord}
                        disabled={!newWord.trim()}
                    >
                        Add
                    </Button>
                </div>
                {customWords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {customWords.map((word) => (
                            <button
                                key={word}
                                onClick={() => handleRemoveWord(word)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md border border-zinc-700 transition-colors"
                            >
                                <span>{word}</span>
                                <span className="text-zinc-500">×</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};
