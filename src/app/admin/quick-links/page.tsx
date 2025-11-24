'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { toast } from 'react-hot-toast';
import { Save, Plus, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react';

interface QuickLink {
    id?: string;
    type: string;
    label_lo: string;

    label_en: string;
    url: string;
    icon?: string;
    color?: string;
    order: number;
    isActive: boolean;
}

const linkTypes = [
    { value: 'WHATSAPP', label: 'WhatsApp' },
    { value: 'FACEBOOK', label: 'Facebook' },
    { value: 'LINE', label: 'LINE' },
    { value: 'PHONE', label: 'Phone' },
    { value: 'EMAIL', label: 'Email' },
    { value: 'TELEGRAM', label: 'Telegram' },
    { value: 'WECHAT', label: 'WeChat' },
    { value: 'CUSTOM', label: 'Custom' }
];

export default function QuickLinksPage() {
    const [links, setLinks] = useState<QuickLink[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        try {
            const res = await fetch('/api/quick-links');
            const data = await res.json();
            if (data.success) {
                setLinks(data.data);
            }
        } catch (error) {
            console.error('Error fetching quick links:', error);
            toast.error('Failed to load quick links');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/quick-links', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ links })
            });

            const data = await res.json();
            if (data.success) {
                toast.success('Quick links updated successfully!');
                fetchLinks();
            } else {
                toast.error(data.error || 'Failed to update quick links');
            }
        } catch (error) {
            console.error('Error saving quick links:', error);
            toast.error('Failed to save quick links');
        } finally {
            setSaving(false);
        }
    };

    const addLink = () => {
        const newLink: QuickLink = {
            type: 'CUSTOM',
            label_lo: '',

            label_en: '',
            url: '',
            icon: '',
            color: '#ec4899',
            order: links.length,
            isActive: true
        };
        setLinks([...links, newLink]);
    };

    const removeLink = (index: number) => {
        setLinks(links.filter((_, i) => i !== index));
    };

    const updateLink = (index: number, field: string, value: any) => {
        const updatedLinks = [...links];
        updatedLinks[index] = {
            ...updatedLinks[index],
            [field]: value
        };
        setLinks(updatedLinks);
    };

    const moveLink = (index: number, direction: 'up' | 'down') => {
        const newLinks = [...links];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex >= 0 && targetIndex < newLinks.length) {
            [newLinks[index], newLinks[targetIndex]] = [newLinks[targetIndex], newLinks[index]];
            // Update order
            newLinks.forEach((link, i) => {
                link.order = i;
            });
            setLinks(newLinks);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading quick links...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading font-bold mb-2">Quick Links Management</h1>
                    <p className="text-gray-600">Manage social media and contact quick links</p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={addLink} variant="outline" className="flex items-center gap-2">
                        <Plus size={20} />
                        Add Link
                    </Button>
                    <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2">
                        {saving ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save size={20} />
                                Save All
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                {links.map((link, index) => (
                    <Card key={index}>
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex flex-col gap-2 pt-2">
                                    <button
                                        onClick={() => moveLink(index, 'up')}
                                        disabled={index === 0}
                                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                                    >
                                        <GripVertical size={20} />
                                    </button>
                                </div>

                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                        <select
                                            value={link.type}
                                            onChange={(e) => updateLink(index, 'type', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                                        >
                                            {linkTypes.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                                        <Input
                                            value={link.url}
                                            onChange={(e) => updateLink(index, 'url', e.target.value)}
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Emoji)</label>
                                        <Input
                                            value={link.icon || ''}
                                            onChange={(e) => updateLink(index, 'icon', e.target.value)}
                                            placeholder="📱"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Label (Lao)</label>
                                        <Input
                                            value={link.label_lo}
                                            onChange={(e) => updateLink(index, 'label_lo', e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Label (Thai)</label>
                                        <Input
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Label (English)</label>
                                        <Input
                                            value={link.label_en}
                                            onChange={(e) => updateLink(index, 'label_en', e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="color"
                                                value={link.color || '#ec4899'}
                                                onChange={(e) => updateLink(index, 'color', e.target.value)}
                                                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                                            />
                                            <Input
                                                value={link.color || '#ec4899'}
                                                onChange={(e) => updateLink(index, 'color', e.target.value)}
                                                placeholder="#ec4899"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-end">
                                        <button
                                            onClick={() => updateLink(index, 'isActive', !link.isActive)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${link.isActive
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                }`}
                                        >
                                            {link.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                                            {link.isActive ? 'Active' : 'Inactive'}
                                        </button>
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    onClick={() => removeLink(index)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 size={20} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {links.length === 0 && (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <p className="text-gray-500 mb-4">No quick links added yet</p>
                            <Button onClick={addLink} className="flex items-center gap-2 mx-auto">
                                <Plus size={20} />
                                Add Your First Link
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
