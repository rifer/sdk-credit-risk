import { NextRequest, NextResponse } from 'next/server';
import { getAllConfigs, createConfig } from '@/lib/config-storage';
import { WidgetConfig } from '@credit-scoring/shared';

export async function GET() {
  try {
    const configs = await getAllConfigs();
    return NextResponse.json({ success: true, data: configs });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch configurations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const config: WidgetConfig = await request.json();
    const created = await createConfig(config);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create configuration';
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
