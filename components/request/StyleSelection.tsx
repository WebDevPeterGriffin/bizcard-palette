"use client";

import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CARD_META } from '@/components/cards/registry';
import { CardFormData } from './schema';

interface StyleSelectionProps {
    control: Control<CardFormData>;
    errors: FieldErrors<CardFormData>;
}

export function StyleSelection({ control, errors }: StyleSelectionProps) {
    const cardStyles = Object.entries(CARD_META).map(([id, meta]) => ({
        id,
        name: meta.name,
    }));

    return (
        <div>
            <Label htmlFor="style">Choose Your Style *</Label>
            <Controller
                control={control}
                name="style_id"
                render={({ field }) => (
                    <Select
                        value={field.value}
                        onValueChange={field.onChange}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a card style" />
                        </SelectTrigger>
                        <SelectContent>
                            {cardStyles.map((style) => (
                                <SelectItem key={style.id} value={style.id}>
                                    {style.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            {errors.style_id && (
                <p className="text-sm text-destructive mt-1">{errors.style_id.message}</p>
            )}
        </div>
    );
}
