import { SettingsUI } from '@/components/settings-ui';
import { Typography } from '@/components/typography';
import { Power } from 'lucide-react';
import { Switch } from '@/components/switch';
import { useStartOnBootState } from './hooks/use-start-on-boot-state';

export const StartOnBootSettings = () => {
    const { startOnBoot, setStartOnBoot } = useStartOnBootState();

    return (
        <SettingsUI.Item>
            <SettingsUI.Description>
                <Typography.Title className="flex items-center gap-2">
                    <Power className="w-4 h-4 text-zinc-400" />
                    Start on boot
                </Typography.Title>
                <Typography.Paragraph>
                    If enabled, Murmure will start automatically when your
                    system starts.
                </Typography.Paragraph>
            </SettingsUI.Description>
            <Switch checked={startOnBoot} onCheckedChange={setStartOnBoot} />
        </SettingsUI.Item>
    );
};
