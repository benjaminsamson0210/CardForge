import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { ACCENT_COLORS, DEFAULT_CARD_CONFIG } from '@/lib/constants';
import { AccentColor, ColorMode, PatternType, ThemeType } from '@/types/mugshot';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const rawUrl = searchParams.get('url') || DEFAULT_CARD_CONFIG.url;
    // Strip protocol for clean display badge
    const displayUrl = rawUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const title = searchParams.get('title') || DEFAULT_CARD_CONFIG.title;
    const description = searchParams.get('description') || DEFAULT_CARD_CONFIG.description;
    const theme = (searchParams.get('theme') as ThemeType) || DEFAULT_CARD_CONFIG.theme;
    const mode = (searchParams.get('mode') as ColorMode) || DEFAULT_CARD_CONFIG.mode;
    const colorParam = searchParams.get('color') || DEFAULT_CARD_CONFIG.color;
    const pattern = (searchParams.get('pattern') as PatternType) || DEFAULT_CARD_CONFIG.pattern;
    const hideWatermark =
      searchParams.get('hide_watermark') === '1' ||
      searchParams.get('hide_watermark') === 'true' ||
      searchParams.get('watermark') === '0';
    const price = searchParams.get('price') || DEFAULT_CARD_CONFIG.price || '$29';
    const discountedPrice = searchParams.get('discounted_price') || DEFAULT_CARD_CONFIG.discountedPrice || '$19';
    const imageUrl = searchParams.get('image') || '';

    // Determine accent hex
    let accentHex = '#6366f1'; // fallback indigo
    if (colorParam.startsWith('#')) {
      accentHex = colorParam;
    } else if (ACCENT_COLORS[colorParam as AccentColor]) {
      accentHex = ACCENT_COLORS[colorParam as AccentColor].hex;
    }

    const isDark = mode === 'dark';
    const bgColor = isDark ? '#111827' : '#f9fafb';
    const cardBgColor = isDark ? '#1f2937' : '#ffffff';
    const textColor = isDark ? '#f9fafb' : '#111827';
    const mutedTextColor = isDark ? '#9ca3af' : '#4b5563';
    const borderColor = isDark ? '#374151' : '#e5e7eb';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: bgColor,
            position: 'relative',
            padding: '40px',
            boxSizing: 'border-box',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Card Container */}
          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: cardBgColor,
              borderRadius: '24px',
              border: `2px solid ${borderColor}`,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Top Accent Strip for Default / Bold */}
            <div
              style={{
                width: '100%',
                height: theme === 'bold' ? '14px' : '8px',
                backgroundColor: accentHex,
              }}
            />

            {/* Layout Variants */}
            {theme === 'bold' ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '60px 70px',
                  flex: 1,
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    fontSize: '24px',
                    fontWeight: 700,
                    color: accentHex,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '20px',
                  }}
                >
                  {displayUrl}
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: '64px',
                    fontWeight: 900,
                    lineHeight: 1.15,
                    color: textColor,
                    letterSpacing: '-0.02em',
                    marginBottom: '24px',
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: '26px',
                    color: mutedTextColor,
                    lineHeight: 1.4,
                  }}
                >
                  {description}
                </div>
              </div>
            ) : theme === 'two_up' ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  padding: '50px 60px',
                  flex: 1,
                  alignItems: 'center',
                  gap: '40px',
                }}
              >
                {/* Visual Avatar / Icon box */}
                <div
                  style={{
                    width: '180px',
                    height: '180px',
                    borderRadius: '20px',
                    backgroundColor: `${accentHex}1a`,
                    border: `3px solid ${accentHex}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '68px',
                    fontWeight: 800,
                    color: accentHex,
                  }}
                >
                  {displayUrl ? displayUrl.charAt(0).toUpperCase() : 'M'}
                </div>
                {/* Content */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      fontSize: '20px',
                      fontWeight: 700,
                      color: accentHex,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '12px',
                    }}
                  >
                    {displayUrl}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      fontSize: '48px',
                      fontWeight: 800,
                      color: textColor,
                      lineHeight: 1.2,
                      marginBottom: '16px',
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      fontSize: '22px',
                      color: mutedTextColor,
                      lineHeight: 1.4,
                    }}
                  >
                    {description}
                  </div>
                </div>
              </div>
            ) : theme === 'e_commerce' ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  padding: '50px 60px',
                  flex: 1,
                  alignItems: 'center',
                  gap: '40px',
                }}
              >
                {/* Product Box */}
                <div
                  style={{
                    width: '260px',
                    height: '320px',
                    borderRadius: '16px',
                    backgroundColor: isDark ? '#111827' : '#f3f4f6',
                    border: `2px solid ${borderColor}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '60px',
                      marginBottom: '16px',
                    }}
                  >
                    📦
                  </div>
                  <div
                    style={{
                      fontSize: '32px',
                      fontWeight: 800,
                      color: accentHex,
                    }}
                  >
                    {price}
                  </div>
                </div>
                {/* Details */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      fontSize: '20px',
                      fontWeight: 700,
                      color: accentHex,
                      textTransform: 'uppercase',
                      marginBottom: '12px',
                    }}
                  >
                    {displayUrl}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      fontSize: '48px',
                      fontWeight: 800,
                      color: textColor,
                      lineHeight: 1.2,
                      marginBottom: '16px',
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      fontSize: '22px',
                      color: mutedTextColor,
                      lineHeight: 1.4,
                    }}
                  >
                    {description}
                  </div>
                </div>
              </div>
            ) : (
              /* Default Theme */
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '50px 60px',
                  flex: 1,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: accentHex,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '16px',
                  }}
                >
                  {displayUrl}
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: '52px',
                    fontWeight: 900,
                    color: textColor,
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                    marginBottom: '20px',
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: '24px',
                    color: mutedTextColor,
                    lineHeight: 1.4,
                  }}
                >
                  {description}
                </div>
              </div>
            )}

            {/* Bottom-right watermark badge */}
            {!hideWatermark && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  right: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                  border: `1px solid ${borderColor}`,
                  borderRadius: '10px',
                  padding: '8px 14px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: mutedTextColor,
                  }}
                >
                  Image via CardForge.io
                </div>
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    backgroundColor: accentHex,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      }
    );
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : 'Unknown generation error';
    return new Response(`Failed to generate image: ${errorMsg}`, { status: 500 });
  }
}
