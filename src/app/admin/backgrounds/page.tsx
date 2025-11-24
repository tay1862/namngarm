'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import ImagePicker from '@/components/admin/forms/ImagePicker';
import { toast } from 'react-hot-toast';
import { Save, Image as ImageIcon } from 'lucide-react';

interface BackgroundSettings {
    homeBg: string | null;
    productsBg: string | null;
    articlesBg: string | null;
    contactBg: string | null;
}

export default function BackgroundsPage() {
    const [backgrounds, setBackgrounds] = useState<BackgroundSettings>({
        homeBg: null,
        productsBg: null,
        articlesBg: null,
        contactBg: null,
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchBackgrounds();
    }, []);

    const fetchBackgrounds = async () => {
        try {
            const res = await fetch('/api/settings');
            const data = await res.json();
            if (data.success) {
                setBackgrounds({
                    homeBg: data.data.homeBg || null,
                    productsBg: data.data.productsBg || null,
                    articlesBg: data.data.articlesBg || null,
                    contactBg: data.data.contactBg || null,
                });
            }
        } catch (error) {
            console.error('Error fetching backgrounds:', error);
            toast.error('Failed to load backgrounds');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(backgrounds),
            });

            const data = await res.json();
            if (data.success) {
                toast.success('Backgrounds updated successfully!');
            } else {
                toast.error(data.error || 'Failed to update backgrounds');
            }
        } catch (error) {
            console.error('Error saving backgrounds:', error);
            toast.error('Failed to save backgrounds');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading backgrounds...</p>
                </div>
            </div>
        );
    }

    const backgroundSections = [
        { key: 'homeBg', label: 'Homepage Background', icon: '🏠' },
        { key: 'productsBg', label: 'Products Page Background', icon: '🛍️' },
        { key: 'articlesBg', label: 'Articles Page Background', icon: '📰' },
        { key: 'contactBg', label: 'Contact Page Background', icon: '📞' },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-heading font-bold mb-2">Background Management</h1>
                <p className="text-gray-600">Manage background images for different pages</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {backgroundSections.map((section) => (
                    <Card key={section.key}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">{section.icon}</span>
                                {section.label}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ImagePicker
                                value={backgrounds[section.key as keyof BackgroundSettings] || ''}
                                onChange={(url) =>
                                    setBackgrounds((prev) => ({
                                        ...prev,
                                        [section.key]: url,
                                    }))
                                }
                                label="Background Image"
                            />
                            {backgrounds[section.key as keyof BackgroundSettings] && (
                                <div className="mt-4 relative aspect-video rounded-lg overflow-hidden border">
                                    <img
                                        src={backgrounds[section.key as keyof BackgroundSettings]!}
                                        alt={section.label}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="flex justify-end gap-4 sticky bottom-6 bg-white p-4 rounded-lg shadow-lg border">
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2"
                >
                    {saving ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save size={20} />
                            Save All Backgrounds
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
