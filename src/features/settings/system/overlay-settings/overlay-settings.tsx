import { SettingsUI } from '@/components/settings-ui';
import { Typography } from '@/components/typography';
import { Eye, Ruler } from 'lucide-react';
import { useOverlayState } from './hooks/use-overlay-state';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/select';

export const OverlaySettings = () => {
    const { overlayMode, setOverlayMode, overlayPosition, setOverlayPosition } =
        useOverlayState();

    return (
        <>
            <SettingsUI.Item>
                <SettingsUI.Description>
                    <Typography.Title className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-zinc-400" />
                        Overlay visibility
                    </Typography.Title>
                    <Typography.Paragraph>
                        Choose when to show the recording overlay.
                    </Typography.Paragraph>
                </SettingsUI.Description>

                <div className="flex gap-2">
                    <Select value={overlayMode} onValueChange={setOverlayMode}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Select a mode" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="hidden">Hidden</SelectItem>
                            <SelectItem value="recording">
                                While recording
                            </SelectItem>
                            <SelectItem value="always">Always</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </SettingsUI.Item>
            <SettingsUI.Separator />
            <SettingsUI.Item>
                <SettingsUI.Description>
                    <Typography.Title className="flex items-center gap-2">
                        <Ruler className="w-4 h-4 text-zinc-400" />
                        Overlay position
                    </Typography.Title>
                    <Typography.Paragraph>
                        Choose whether the overlay appears at the top or bottom.
                    </Typography.Paragraph>
                </SettingsUI.Description>
                <div className="flex gap-2">
                    <Select
                        value={overlayPosition}
                        onValueChange={setOverlayPosition}
                    >
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Select a position" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="top">Top</SelectItem>
                            <SelectItem value="bottom">Bottom</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </SettingsUI.Item>
        </>
    );
};
