"use client";

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardFormData } from './schema';

interface PersonalInfoSectionProps {
    register: UseFormRegister<CardFormData>;
    errors: FieldErrors<CardFormData>;
}

export function PersonalInfoSection({ register, errors }: PersonalInfoSectionProps) {
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                        id="full_name"
                        {...register('full_name')}
                        placeholder="John Doe"
                    />
                    {errors.full_name && (
                        <p className="text-sm text-destructive mt-1">{errors.full_name.message}</p>
                    )}
                </div>
                <div>
                    <Label htmlFor="role">Job Title</Label>
                    <Input
                        id="role"
                        {...register('role')}
                        placeholder="Senior Product Manager"
                    />
                    {errors.role && (
                        <p className="text-sm text-destructive mt-1">{errors.role.message}</p>
                    )}
                </div>
            </div>

            <div>
                <Label htmlFor="company">Company</Label>
                <Input
                    id="company"
                    {...register('company')}
                    placeholder="Tech Innovations Inc."
                />
                {errors.company && (
                    <p className="text-sm text-destructive mt-1">{errors.company.message}</p>
                )}
            </div>
        </>
    );
}
