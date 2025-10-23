import { Typography } from '@/components/typography';
import { formatTime } from './history.helpers';
import { useHistoryState } from './hooks/use-history-state';

interface HistoryProps {}

export const History = ({}: HistoryProps) => {
    const { history } = useHistoryState();

    return (
        <div className="space-y-2 w-full">
            <Typography.Title>
                Recent activity{' '}
                <span className="text-[10px] text-zinc-400">
                    (Only the last 5 transcriptions are kept; older text and
                    audio files are deleted)
                </span>
            </Typography.Title>
            {history.length === 0 ? (
                <Typography.Paragraph>
                    No transcriptions yet
                </Typography.Paragraph>
            ) : (
                <div className="space-y-2">
                    {history.map((entry) => (
                        <div
                            key={entry.id}
                            className="rounded-md border border-zinc-700 p-3"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <Typography.Paragraph>
                                    {entry.text === '' ? (
                                        <span className="italic text-xs">
                                            (Empty transcription)
                                        </span>
                                    ) : (
                                        entry.text
                                    )}
                                </Typography.Paragraph>
                                <Typography.Paragraph className="text-xs block w-20 text-right">
                                    {formatTime(entry.timestamp)}
                                </Typography.Paragraph>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
