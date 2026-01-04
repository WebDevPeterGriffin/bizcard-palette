"use client";

import { Control, UseFormRegister, FieldErrors, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { CardFormData } from './schema';

interface ContactInfoSectionProps {
    control: Control<CardFormData>;
    register: UseFormRegister<CardFormData>;
    errors: FieldErrors<CardFormData>;
}

export function ContactInfoSection({ control, register, errors }: ContactInfoSectionProps) {
    const { fields: emailFields, append: appendEmail, remove: removeEmail } = useFieldArray({
        control,
        name: 'emails',
    });

    const { fields: phoneFields, append: appendPhone, remove: removePhone } = useFieldArray({
        control,
        name: 'phones',
    });

    return (
        <>
            {/* Email Addresses */}
            <div>
                <Label>Email Addresses *</Label>
                <div className="space-y-2">
                    {emailFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2">
                            <Input
                                {...register(`emails.${index}.value` as const)}
                                placeholder="john@company.com"
                                type="email"
                            />
                            {emailFields.length > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => removeEmail(index)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                    {errors.emails?.[0]?.value && (
                        <p className="text-sm text-destructive">{errors.emails[0].value.message}</p>
                    )}
                </div>
                {emailFields.length < 5 && (
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendEmail({ value: '' })}
                        className="mt-2"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Email
                    </Button>
                )}
            </div>

            {/* Phone Numbers */}
            <div>
                <Label>Phone Numbers</Label>
                <div className="space-y-2">
                    {phoneFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2">
                            <Input
                                {...register(`phones.${index}.value` as const)}
                                placeholder="+1 (555) 123-4567"
                                type="tel"
                            />
                            {phoneFields.length > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => removePhone(index)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                    {errors.phones?.[0]?.value && (
                        <p className="text-sm text-destructive">{errors.phones[0].value.message}</p>
                    )}
                </div>
                {phoneFields.length < 5 && (
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendPhone({ value: '' })}
                        className="mt-2"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Phone
                    </Button>
                )}
            </div>

            {/* Website */}
            <div>
                <Label htmlFor="website">Website</Label>
                <Input
                    id="website"
                    {...register('website')}
                    placeholder="www.johndoe.com"
                />
                {errors.website && (
                    <p className="text-sm text-destructive mt-1">{errors.website.message}</p>
                )}
            </div>
        </>
    );
}
