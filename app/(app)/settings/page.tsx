'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Settings, Check } from 'lucide-react'

interface SettingsForm {
  theme: string
  uiLanguage: string
  audioSpeed: number
  showPinyin: boolean
  showTranslation: boolean
  autoPlay: boolean
  dailyWordsTarget: number
  dailyMinutesTarget: number
  targetHskLevel: number
}

const defaultSettings: SettingsForm = {
  theme: 'system',
  uiLanguage: 'zh',
  audioSpeed: 1.0,
  showPinyin: true,
  showTranslation: true,
  autoPlay: false,
  dailyWordsTarget: 10,
  dailyMinutesTarget: 20,
  targetHskLevel: 3,
}

export default function SettingsPage() {
  const [form, setForm] = useState<SettingsForm>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings')
        if (res.ok) {
          const data = await res.json()
          setForm({ ...defaultSettings, ...data })
        }
      } catch {
        console.error('Failed to fetch settings')
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch {
      console.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  function set<K extends keyof SettingsForm>(key: K, value: SettingsForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading settings...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-muted">
          <Settings className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground text-sm">设置 — Customize your learning experience</p>
        </div>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Appearance</CardTitle>
          <CardDescription>Customize the look and feel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme">Theme</Label>
            <Select value={form.theme} onValueChange={(v) => set('theme', v)}>
              <SelectTrigger id="theme" className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="uiLanguage">Interface Language</Label>
            <Select value={form.uiLanguage} onValueChange={(v) => set('uiLanguage', v)}>
              <SelectTrigger id="uiLanguage" className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Learning display */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Learning Display</CardTitle>
          <CardDescription>Control what is shown during study</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="showPinyin">Show Pinyin</Label>
              <p className="text-xs text-muted-foreground">Display pinyin pronunciation guides</p>
            </div>
            <Switch
              id="showPinyin"
              checked={form.showPinyin}
              onCheckedChange={(v) => set('showPinyin', v)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="showTranslation">Show Translation</Label>
              <p className="text-xs text-muted-foreground">Display English translations</p>
            </div>
            <Switch
              id="showTranslation"
              checked={form.showTranslation}
              onCheckedChange={(v) => set('showTranslation', v)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoPlay">Auto-play Audio</Label>
              <p className="text-xs text-muted-foreground">Automatically play audio for new cards</p>
            </div>
            <Switch
              id="autoPlay"
              checked={form.autoPlay}
              onCheckedChange={(v) => set('autoPlay', v)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Audio */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Audio</CardTitle>
          <CardDescription>Adjust playback settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="audioSpeed">Playback Speed</Label>
              <span className="text-sm font-medium tabular-nums">{form.audioSpeed.toFixed(2)}×</span>
            </div>
            <input
              id="audioSpeed"
              type="range"
              min={0.5}
              max={2.0}
              step={0.25}
              value={form.audioSpeed}
              onChange={(e) => set('audioSpeed', parseFloat(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.5×</span>
              <span>1.0×</span>
              <span>1.5×</span>
              <span>2.0×</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daily Goals</CardTitle>
          <CardDescription>Set your learning targets</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="dailyWords">Words per day</Label>
              <Input
                id="dailyWords"
                type="number"
                min={1}
                max={200}
                value={form.dailyWordsTarget}
                onChange={(e) => set('dailyWordsTarget', parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dailyMins">Minutes per day</Label>
              <Input
                id="dailyMins"
                type="number"
                min={5}
                max={480}
                value={form.dailyMinutesTarget}
                onChange={(e) => set('dailyMinutesTarget', parseInt(e.target.value) || 5)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="targetLevel">Target HSK Level</Label>
            <Select
              value={String(form.targetHskLevel)}
              onValueChange={(v) => set('targetHskLevel', parseInt(v))}
            >
              <SelectTrigger id="targetLevel">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((l) => (
                  <SelectItem key={l} value={String(l)}>
                    HSK {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3 pb-6">
        <Button onClick={handleSave} disabled={saving} className="min-w-[120px]">
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
        {saved && (
          <div className="flex items-center gap-1.5 text-sm text-green-600 dark:text-green-400">
            <Check className="h-4 w-4" />
            Saved!
          </div>
        )}
      </div>
    </div>
  )
}
