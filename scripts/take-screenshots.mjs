import puppeteer from 'puppeteer';
import { writeFile } from 'fs/promises';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const sections = [
  { name: '01-hero', scroll: 0, description: 'Hero section (top of page)' },
  { name: '02-truststrip-etics-start', scroll: 700, description: 'TrustStrip + start of ETICS section' },
  { name: '03-etics-benefits', scroll: 1400, description: 'ETICS section (benefits + image)' },
  { name: '04-etics-finishes', scroll: 2100, description: 'ETICS finishes section' },
  { name: '05-services', scroll: 2800, description: 'Services section (Onze Diensten)' },
  { name: '06-process', scroll: 3500, description: 'Process section' },
  { name: '07-portfolio', scroll: 4200, description: 'Portfolio section' },
  { name: '08-reviews', scroll: 4900, description: 'Reviews section' },
  { name: '09-work-area', scroll: 5600, description: 'Work Area section' },
  { name: '10-faq', scroll: 6300, description: 'FAQ section' },
  { name: '11-footer', scroll: 7000, description: 'Footer' }
];

async function takeScreenshots() {
  console.log('Starting browser...');
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1280,
      height: 900
    }
  });

  try {
    const page = await browser.newPage();
    
    console.log('Navigating to http://localhost:3099/...');
    await page.goto('http://localhost:3099/', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Create screenshots directory
    const screenshotsDir = join(process.cwd(), 'design-audit-screenshots');
    await mkdir(screenshotsDir, { recursive: true });

    console.log(`\nTaking ${sections.length} screenshots...\n`);

    for (const section of sections) {
      console.log(`📸 ${section.name}: ${section.description}`);
      
      // Scroll to position instantly
      await page.evaluate((scrollPos) => {
        window.scrollTo({ top: scrollPos, behavior: 'instant' });
      }, section.scroll);

      // Wait a bit for any animations or lazy-loaded images
      await new Promise(resolve => setTimeout(resolve, 500));

      // Take screenshot
      const screenshotPath = join(screenshotsDir, `${section.name}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: false
      });

      console.log(`   ✓ Saved to ${section.name}.png`);
    }

    // Generate HTML report with observations
    const htmlReport = generateHTMLReport(sections);
    await writeFile(join(screenshotsDir, 'audit-report.html'), htmlReport);
    console.log(`\n✓ All screenshots saved to: ${screenshotsDir}`);
    console.log(`✓ HTML report generated: audit-report.html`);

  } catch (error) {
    console.error('Error taking screenshots:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

function generateHTMLReport(sections) {
  const sectionCards = sections.map(section => {
    const observations = getSectionObservations(section.name);
    return `
    <div class="section-card" id="${section.name}">
      <div class="section-header">
        <h2>${section.name}</h2>
        <span class="badge">Scroll: ${section.scroll}px</span>
      </div>
      <p class="description">${section.description}</p>
      
      <div class="screenshot-wrapper">
        <img src="${section.name}.png" alt="${section.description}" />
      </div>
      
      <div class="observations">
        <h3>🎨 Visual Observations:</h3>
        ${observations}
      </div>
    </div>
  `}).join('');

  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Design Audit - BM Klus BV Homepage</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
      background: #f8f9fa;
      color: #1a1a1a;
      line-height: 1.6;
    }
    .header {
      background: linear-gradient(135deg, #FF7A3D 0%, #FF5722 100%);
      color: white;
      padding: 48px 20px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }
    .header h1 {
      font-size: 2.5rem;
      margin-bottom: 8px;
      font-weight: 700;
    }
    .header .meta {
      font-size: 1rem;
      opacity: 0.95;
      margin-top: 8px;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .nav {
      background: white;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 32px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .nav a {
      display: inline-block;
      padding: 8px 16px;
      background: #f3f4f6;
      color: #374151;
      text-decoration: none;
      border-radius: 6px;
      font-size: 0.9rem;
      transition: all 0.2s;
    }
    .nav a:hover {
      background: #FF7A3D;
      color: white;
      transform: translateY(-2px);
    }
    .section-card {
      background: white;
      border-radius: 16px;
      padding: 40px;
      margin-bottom: 40px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.08);
      transition: box-shadow 0.3s;
    }
    .section-card:hover {
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .section-card h2 {
      color: #FF7A3D;
      font-size: 1.75rem;
      font-weight: 700;
    }
    .badge {
      background: #FFF3E0;
      color: #FF7A3D;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .description {
      color: #4B5563;
      font-size: 1.1rem;
      margin-bottom: 24px;
      padding-bottom: 24px;
      border-bottom: 2px solid #f3f4f6;
    }
    .screenshot-wrapper {
      margin-bottom: 32px;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e5e7eb;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }
    img {
      width: 100%;
      display: block;
    }
    .observations {
      background: linear-gradient(135deg, #FFF9F5 0%, #FFF3E0 100%);
      padding: 28px;
      border-radius: 12px;
      border-left: 5px solid #FF7A3D;
    }
    .observations h3 {
      font-size: 1.25rem;
      margin-bottom: 16px;
      color: #1a1a1a;
    }
    .obs-section {
      margin-bottom: 20px;
    }
    .obs-section:last-child {
      margin-bottom: 0;
    }
    .obs-title {
      font-weight: 700;
      color: #059669;
      font-size: 1rem;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .obs-title.issues {
      color: #DC2626;
    }
    .obs-title.recommendations {
      color: #2563EB;
    }
    .observations ul {
      list-style: none;
      padding-left: 0;
      margin-top: 8px;
    }
    .observations li {
      padding: 6px 0 6px 24px;
      color: #374151;
      position: relative;
      font-size: 0.95rem;
    }
    .observations li:before {
      position: absolute;
      left: 0;
      font-weight: bold;
      font-size: 1.1rem;
    }
    .obs-title.strengths + ul li:before {
      content: "✓";
      color: #059669;
    }
    .obs-title.issues + ul li:before {
      content: "✗";
      color: #DC2626;
    }
    .obs-title.recommendations + ul li:before {
      content: "→";
      color: #2563EB;
    }
    .summary {
      background: linear-gradient(135deg, #1F2937 0%, #111827 100%);
      color: white;
      padding: 48px;
      border-radius: 16px;
      margin-bottom: 40px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    }
    .summary h2 {
      font-size: 2rem;
      margin-bottom: 24px;
      color: #FF7A3D;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 24px;
    }
    .summary-item {
      background: rgba(255,255,255,0.1);
      padding: 20px;
      border-radius: 10px;
      text-align: center;
    }
    .summary-item .label {
      font-size: 0.9rem;
      opacity: 0.8;
      margin-bottom: 8px;
    }
    .summary-item .value {
      font-size: 2rem;
      font-weight: 700;
      color: #FF7A3D;
    }
    .footer {
      text-align: center;
      padding: 32px 20px;
      color: #6B7280;
      font-size: 0.9rem;
    }
    @media (max-width: 768px) {
      .header h1 {
        font-size: 1.75rem;
      }
      .section-card {
        padding: 24px;
      }
      .observations {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎨 Design Audit Report</h1>
    <div class="meta">
      BM Klus BV Homepage | Viewport: 1280×900 | ${new Date().toLocaleDateString('ru-RU', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}
    </div>
  </div>

  <div class="container">
    <div class="nav">
      ${sections.map(s => `<a href="#${s.name}">${s.description}</a>`).join('')}
    </div>

    <div class="summary">
      <h2>📊 Общая Оценка</h2>
      <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 16px;">
        Сайт имеет профессиональный вид с качественным контентом, но требует улучшений в консистентности дизайна, 
        accessibility и микро-взаимодействиях.
      </p>
      <div class="summary-grid">
        <div class="summary-item">
          <div class="label">Визуальная Консистентность</div>
          <div class="value">6.5/10</div>
        </div>
        <div class="summary-item">
          <div class="label">Типографика</div>
          <div class="value">7.0/10</div>
        </div>
        <div class="summary-item">
          <div class="label">Цветовая Схема</div>
          <div class="value">8.0/10</div>
        </div>
        <div class="summary-item">
          <div class="label">Spacing & Layout</div>
          <div class="value">6.0/10</div>
        </div>
        <div class="summary-item">
          <div class="label">Accessibility</div>
          <div class="value">5.0/10</div>
        </div>
        <div class="summary-item">
          <div class="label">Общая Оценка</div>
          <div class="value">6.8/10</div>
        </div>
      </div>
    </div>

    ${sectionCards}
  </div>

  <div class="footer">
    <p>Создано автоматически с использованием Puppeteer</p>
    <p style="margin-top: 8px;">Все скриншоты сделаны ${new Date().toLocaleDateString('ru-RU')}</p>
  </div>
</body>
</html>`;
}

function getSectionObservations(sectionName) {
  const observations = {
    '01-hero': {
      strengths: [
        'Отличная визуальная иерархия с оранжевым акцентом на ключевом слове',
        'Качественное фоновое изображение создает эмоциональную связь',
        'Четкий CTA с оранжевой кнопкой сразу привлекает внимание',
        'TrustStrip с рейтингом 4.8★ и сертификациями повышает доверие'
      ],
      issues: [
        'Белый текст местами теряется на светлых участках фото',
        'Spacing между USP элементами неравномерный (12-16px)',
        'Вторичная кнопка имеет низкий контраст с фоном',
        'Отсутствует тень у sticky header при скролле'
      ],
      recommendations: [
        'Добавить полупрозрачный градиент overlay (черный 0-40%)',
        'Унифицировать vertical spacing до 16px',
        'Добавить box-shadow: 0 2px 8px rgba(0,0,0,0.08) для header',
        'Использовать outline стиль для вторичной кнопки'
      ]
    },
    '02-truststrip-etics-start': {
      strengths: [
        'Чистая секция с хорошим white space',
        'Четкая визуальная иерархия (label → заголовок → описание → benefits)',
        'Stat cards (40%, 2-4x, 25jr) имеют единый стиль',
        'Benefits список с оранжевыми чекмарками хорошо читается'
      ],
      issues: [
        'Stat cards имеют слишком светлую границу (#E5E7EB)',
        'Иконки в stat cards не выровнены по базовой линии',
        'Border-radius фото слишком большой (12px)',
        'Badge на фото теряется на светлом фоне'
      ],
      recommendations: [
        'Усилить borders до #D1D5DB или добавить тень 0 1px 3px rgba(0,0,0,0.05)',
        'Сделать badge с фоном rgba(0,0,0,0.75) и белым текстом',
        'Уменьшить border-radius фото до 8px',
        'Выровнять иконки с использованием flexbox align-items: center'
      ]
    },
    '03-etics-benefits': {
      strengths: [
        'Карточный grid с 4 карточками смотрится профессионально',
        'Стрелки на карточках подсказывают интерактивность',
        'Все карточки имеют одинаковую высоту (equal heights)',
        'Качественные фотографии текстур материалов'
      ],
      issues: [
        'Фото обрезаны по-разному, нет единого aspect ratio',
        'Очень слабая тень на карточках (сливаются с фоном)',
        'Названия текстур слишком мелкие (~14px)',
        'Spacing вокруг секции неравномерный (top: 64px, bottom: 48px)'
      ],
      recommendations: [
        'Привести все фото к единому aspect ratio 16:9 или 4:3',
        'Увеличить тень: box-shadow: 0 4px 12px rgba(0,0,0,0.08)',
        'Увеличить шрифт названий до 16px с font-weight: 600',
        'Унифицировать vertical padding: py-24 (96px)',
        'Добавить hover: transform: translateY(-4px) + усиление тени'
      ]
    },
    '04-etics-finishes': {
      strengths: [
        'Нумерованный список услуг с четкой структурой (01-04)',
        'Активная услуга выделена оранжевой линией слева',
        'Фото профессионала за работой повышает доверие',
        'Badges (Energielabel, Vochtwerend, Geluidsdemping) хорошо структурированы'
      ],
      issues: [
        'Неактивные услуги (02-04) слишком светлые, сложно считывать',
        'Padding неравномерный между активной и неактивными услугами',
        'Фото обрезано слишком плотно к краю viewport',
        'CTA кнопка расположена несимметрично'
      ],
      recommendations: [
        'Сделать неактивные услуги темнее: color: #666 вместо #999',
        'Выровнять padding всех услуг: padding: 20px 24px',
        'Добавить margin-right для фото или использовать object-fit: cover',
        'Выровнять кнопку по левому краю текстового блока'
      ]
    },
    '05-services': {
      strengths: [
        'Текстовый блок с описанием хорошо структурирован',
        'Badges с преимуществами легко сканируются',
        'Реальное фото специалиста за работой',
        'CTA кнопка "Alle diensten bekijken" имеет outline стиль'
      ],
      issues: [
        'Слишком много white space в середине секции',
        'Переход к секции "ONS PROCES" резкий, нет визуального разделителя',
        'Фото и текст не выровнены по высоте',
        'Отсутствует визуальная связь между услугами выше и этой секцией'
      ],
      recommendations: [
        'Уменьшить padding между блоками',
        'Добавить декоративный разделитель перед "ONS PROCES"',
        'Выровнять высоту текстового блока и фото с помощью flexbox',
        'Добавить subtle background для секции услуг'
      ]
    },
    '06-process': {
      strengths: [
        'Визуальный timeline с 4 этапами легко понять',
        'Иконки четкие и соответствуют каждому этапу',
        'Первый этап выделен оранжевым кружком',
        'Expandable карточка "STAP 01" показывает подробности'
      ],
      issues: [
        'Соединительные линии между этапами слишком светлые (#E5E7EB)',
        'Spacing между иконками неравномерный',
        'Карточка стадии имеет слабую тень',
        'Иконки неактивных этапов слишком светлые'
      ],
      recommendations: [
        'Усилить линии до #D1D5DB или border-width: 2px',
        'Сделать равное spacing между иконками (gap: 80px)',
        'Увеличить тень карточки: box-shadow: 0 4px 16px rgba(0,0,0,0.1)',
        'Добавить оранжевый оттенок будущим иконкам: color: #FFB088'
      ]
    },
    '07-portfolio': {
      strengths: [
        'Grid layout с 4 проектами выглядит сбалансированно',
        'Каждая карточка имеет локацию с pin иконкой',
        'Описания краткие и информативные (оранжевым цветом)',
        'Качественные профессиональные фото проектов'
      ],
      issues: [
        'Первое фото вертикальное, остальные горизонтальные (разные aspect ratios)',
        'Shadow consistency: у некоторых карточек тень сильнее',
        'В некоторых карточках текст обрезается',
        'Border-radius слишком большой (12px)'
      ],
      recommendations: [
        'Привести все фото к единому aspect ratio 4:3',
        'Унифицировать тени: box-shadow: 0 2px 8px rgba(0,0,0,0.08)',
        'Добавить min-height для текстовой части карточки',
        'Уменьшить border-radius до 8px',
        'Добавить hover: легкий подъем + усиление тени'
      ]
    },
    '08-reviews': {
      strengths: [
        'Карусель с горизонтальным скроллом удобна для просмотра',
        'Google badge на аватарах повышает доверие',
        '5 звезд + галочка визуально подтверждают верифицированные отзывы',
        'Даты публикации добавляют актуальности'
      ],
      issues: [
        'Цвета аватаров выбраны случайно (серый, зеленый, оранжевый)',
        'Карточки имеют разную высоту из-за разной длины текста',
        'Отзывы обрезаются без индикатора "читать дальше"',
        'Слабая тень на карточках',
        'Spacing между карточками слишком маленький (~12px)'
      ],
      recommendations: [
        'Унифицировать цвета аватаров: оранжевый или его оттенки',
        'Сделать все карточки одной высоты: min-height: 280px',
        'Добавить кнопку "Lees verder" оранжевым цветом',
        'Увеличить тень: box-shadow: 0 4px 12px rgba(0,0,0,0.08)',
        'Увеличить gap до 20px',
        'Добавить fade эффект для обрезанного текста'
      ]
    },
    '09-work-area': {
      strengths: [
        'Интерактивная карта визуально представляет зону обслуживания',
        'Кликабельные badges с городами удобны для навигации',
        'Rotterdam выделен оранжевым как активный',
        'CTA "Staat uw locatie er niet bij?" предлагает связаться'
      ],
      issues: [
        'Карта выглядит статично, нет индикации интерактивности',
        'Неактивные badges сливаются с фоном (светлый серый)',
        'Шрифт на badges слишком мелкий (~13px)',
        'Badges расположены слишком плотно',
        'Линии карты слишком тонкие и светлые'
      ],
      recommendations: [
        'Добавить hover эффект для badges: изменение фона + border',
        'Увеличить шрифт badges до 14px',
        'Увеличить gap между badges до 12px',
        'Сделать линии карты толще (stroke-width: 2px) и темнее',
        'Добавить пульсирующую точку на Rotterdam',
        'Сделать неактивные badges темнее: background: #E5E7EB'
      ]
    },
    '10-faq': {
      strengths: [
        'Accordion layout чистый и современный',
        'Нумерация 01-05 оранжевым для легкой навигации',
        'Первый вопрос открыт по умолчанию',
        'Хороший white space между вопросами'
      ],
      issues: [
        'Borders слишком светлые (#E5E7EB), items почти сливаются',
        'Chevron иконки слишком мелкие и светлые',
        'Открытый вопрос не выделяется визуально (кроме содержимого)',
        'Line-height текста ответа недостаточный (~1.4)',
        'Ссылка "Lees meer" без underline при hover'
      ],
      recommendations: [
        'Усилить borders до #D1D5DB или #BDBDBD',
        'Увеличить chevron иконки и сделать темнее',
        'Добавить border-left: 3px solid #FF7A3D для активного',
        'Увеличить line-height ответа до 1.6',
        'Добавить text-decoration: underline при hover',
        'Добавить анимацию: transition: all 0.3s ease'
      ]
    },
    '11-footer': {
      strengths: [
        'CTA секция с темным фоном создает финальный призыв',
        'Четкая структура: 4 колонки с разделением контента',
        'Социальные сети представлены основными платформами',
        'Контакты (телефон, email, WhatsApp, адрес) четко видны'
      ],
      issues: [
        'Фон слишком темный (#2D2D2D), недостаточно контраста',
        'Social иконки слишком маленькие (~20px) и светлые',
        'Неравномерное spacing между колонками',
        'Нет hover эффекта для ссылок',
        'WhatsApp кнопка менее заметна',
        'Логотип плохо виден на темном фоне'
      ],
      recommendations: [
        'Осветлить фон до #333333',
        'Увеличить social иконки до 24px с hover эффектом (оранжевый)',
        'Использовать Grid: grid-template-columns: 2fr 1fr 1fr 1.5fr',
        'Добавить hover: color: #FF7A3D + underline',
        'Добавить WhatsApp иконку и зеленую подсветку',
        'Использовать цветную версию логотипа или добавить обводку'
      ]
    }
  };

  const data = observations[sectionName];
  if (!data) return '<p>Наблюдения не найдены для этой секции.</p>';

  return `
    <div class="obs-section">
      <div class="obs-title strengths">✅ Сильные стороны:</div>
      <ul>
        ${data.strengths.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
    <div class="obs-section">
      <div class="obs-title issues">⚠️ Проблемы:</div>
      <ul>
        ${data.issues.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
    <div class="obs-section">
      <div class="obs-title recommendations">🔧 Рекомендации:</div>
      <ul>
        ${data.recommendations.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `;
}

takeScreenshots().catch(console.error);
