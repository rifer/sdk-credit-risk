import { NextRequest, NextResponse } from 'next/server';
import { getConfigById, updateConfig, deleteConfig } from '@/lib/config-storage';
import { WidgetConfig } from '@credit-scoring/shared';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const config = await getConfigById(params.id);

    if (!config) {
      return NextResponse.json(
        { success: false, error: 'Configuration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: config });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch configuration' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates: Partial<WidgetConfig> = await request.json();
    const updated = await updateConfig(params.id, updates);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update configuration';
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await deleteConfig(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete configuration';
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
