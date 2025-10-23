import { Typography } from '@/components/typography';
import { ShortcutButton } from './shortcut-button/shortcut-button';
import { RenderKeys } from '../../../components/render-keys';
import { SettingsUI } from '@/components/settings-ui';
import { useRecordShortcutState } from './hooks/use-record-shortcut-state';
import { Page } from '@/components/page';
import { useLastTranscriptShortcutState } from './hooks/use-last_transcript-shortcut-state';

interface ShortcutsProps {}

export const Shortcuts = ({}: ShortcutsProps) => {
    const { recordShortcut, setRecordShortcut, resetRecordShortcut } =
        useRecordShortcutState();
    const {
        lastTranscriptShortcut,
        setLastTranscriptShortcut,
        resetLastTranscriptShortcut,
    } = useLastTranscriptShortcutState();

    return (
        <main>
            <div className="space-y-8">
                <Page.Header>
                    <Typography.MainTitle>Shortcuts</Typography.MainTitle>
                    <Typography.Paragraph className="text-zinc-400">
                        Improve your workflow by setting up keyboard shortcuts.
                    </Typography.Paragraph>
                </Page.Header>

                <SettingsUI.Container>
                    <SettingsUI.Item>
                        <SettingsUI.Description>
                            <Typography.Title>Push to talk</Typography.Title>
                            <Typography.Paragraph>
                                Hold <RenderKeys keyString={recordShortcut} />{' '}
                                to record, release to transcribe.
                            </Typography.Paragraph>
                        </SettingsUI.Description>
                        <ShortcutButton
                            keyName="Push to talk"
                            shortcut={recordShortcut}
                            saveShortcut={setRecordShortcut}
                            resetShortcut={resetRecordShortcut}
                        />
                    </SettingsUI.Item>
                    <SettingsUI.Separator />
                    <SettingsUI.Item>
                        <SettingsUI.Description>
                            <Typography.Title>
                                Past last transcript
                            </Typography.Title>
                            <Typography.Paragraph>
                                Press{' '}
                                <RenderKeys
                                    keyString={lastTranscriptShortcut}
                                />{' '}
                                to paste the last transcript. Useful when you
                                forgot to select an input field when you started
                                recording.
                            </Typography.Paragraph>
                        </SettingsUI.Description>
                        <ShortcutButton
                            keyName="Past last transcript"
                            shortcut={lastTranscriptShortcut}
                            saveShortcut={setLastTranscriptShortcut}
                            resetShortcut={resetLastTranscriptShortcut}
                        />
                    </SettingsUI.Item>
                </SettingsUI.Container>
            </div>
        </main>
    );
};
