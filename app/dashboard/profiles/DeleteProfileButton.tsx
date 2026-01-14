'use client';

import { Button } from '@/shared/ui/button';
import { toast } from 'sonner';

export function DeleteProfileButton({
  profileId,
  onDeleted,
}: {
  profileId: string;
  onDeleted: () => void;
}) {
  const del = async () => {
    if (!confirm('Delete this profile? This cannot be undone.')) return;

    await fetch(`/api/profiles/${profileId}`, { method: 'DELETE' });
    toast.success('Profile deleted');
    onDeleted();
  };

  return (
    <Button size="sm" variant="destructive" onClick={del}>
      Delete
    </Button>
  );
}
