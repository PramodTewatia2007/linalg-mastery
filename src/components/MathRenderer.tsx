import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
  inline?: boolean;
}

export const MathRenderer: React.FC<MathRendererProps> = ({ content, className = '', inline = false }) => {
  const renderedHtml = useMemo(() => {
    if (!content) return '';

    // If whole string is single inline or display math
    if (inline) {
      try {
        return katex.renderToString(content.replace(/^\$+|\$+$/g, ''), {
          throwOnError: false,
          displayMode: false,
        });
      } catch (err) {
        return `<span class="text-rose-400">[Math Error: ${content}]</span>`;
      }
    }

    // Split content by $$ ... $$ (display math) and $ ... $ (inline math)
    // Regex matches $$...$$ or $...$
    const mathRegex = /(\$\$[\s\S]+?\$\$|\$[^\$]+?\$)/g;
    const parts = content.split(mathRegex);

    return parts
      .map((part) => {
        if (!part) return '';
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const rawMath = part.slice(2, -2).trim();
          try {
            return `<div class="my-3 overflow-x-auto py-1 text-center">${katex.renderToString(rawMath, {
              throwOnError: false,
              displayMode: true,
            })}</div>`;
          } catch (e) {
            return `<div class="text-rose-400">[Display Math Error: ${rawMath}]</div>`;
          }
        } else if (part.startsWith('$') && part.endsWith('$')) {
          const rawMath = part.slice(1, -1).trim();
          try {
            return katex.renderToString(rawMath, {
              throwOnError: false,
              displayMode: false,
            });
          } catch (e) {
            return `<span class="text-rose-400">[Math Error: ${rawMath}]</span>`;
          }
        } else {
          // Regular text: escape HTML and replace newlines with line breaks or paragraphs if needed
          return part
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n\n/g, '<br/><br/>')
            .replace(/\n/g, '<br/>');
        }
      })
      .join('');
  }, [content, inline]);

  return (
    <span
      className={`inline-block leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

export default MathRenderer;
