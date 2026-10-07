import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Partner, FilterState } from '../types';

export interface PdfExportOptions {
  includeContact?: boolean;
  includeServices?: boolean;
  includeMetrics?: boolean;
  paperSize?: 'a4' | 'letter';
}

export function generatePartnerDirectoryPdf(
  partners: Partner[],
  filters: FilterState,
  options: PdfExportOptions = {}
): jsPDF {
  const {
    includeContact = true,
    includeServices = true,
    includeMetrics = true,
    paperSize = 'a4'
  } = options;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: paperSize
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 36; // 0.5 inch margins

  // Color palette
  const navyDark = [7, 25, 56]; // #071938
  const bluePrimary = [12, 43, 100]; // #0c2b64
  const lemonGreen = [200, 245, 38]; // #c8f526
  const textDark = [15, 23, 42]; // #0f172a
  const textMuted = [100, 116, 139]; // #64748b
  const slateBorder = [226, 232, 240]; // #e2e8f0

  // 1. Top Header Banner
  doc.setFillColor(navyDark[0], navyDark[1], navyDark[2]);
  doc.rect(0, 0, pageWidth, 75, 'F');

  // Lemon green top accent stripe
  doc.setFillColor(lemonGreen[0], lemonGreen[1], lemonGreen[2]);
  doc.rect(0, 0, pageWidth, 4, 'F');

  // NextSofthr Logo Icon Representation
  doc.setFillColor(bluePrimary[0], bluePrimary[1], bluePrimary[2]);
  doc.roundedRect(margin, 18, 40, 40, 6, 6, 'F');
  doc.setDrawColor(lemonGreen[0], lemonGreen[1], lemonGreen[2]);
  doc.setLineWidth(1.5);
  doc.roundedRect(margin, 18, 40, 40, 6, 6, 'D');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('N', margin + 11, 43);
  doc.setTextColor(lemonGreen[0], lemonGreen[1], lemonGreen[2]);
  doc.text('S', margin + 23, 43);

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(17);
  doc.setFont('helvetica', 'bold');
  doc.text('NextSofthr Global Partner Registry', margin + 52, 36);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225);
  doc.text('Official Verified Partner Directory Summary • Pan-African & Global Ecosystem', margin + 52, 51);

  // Right Side Contact Metadata
  doc.setFontSize(8);
  doc.setTextColor(200, 245, 38);
  doc.setFont('helvetica', 'bold');
  doc.text('www.nextsofthr.org', pageWidth - margin, 32, { align: 'right' });
  doc.setTextColor(226, 232, 240);
  doc.setFont('helvetica', 'normal');
  doc.text('Tel: +234 915 848 2622', pageWidth - margin, 44, { align: 'right' });
  doc.text('partners@nextsofthr.org', pageWidth - margin, 56, { align: 'right' });

  // 2. Report Overview & Filter Metadata Box
  let currentY = 90;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(slateBorder[0], slateBorder[1], slateBorder[2]);
  doc.setLineWidth(1);
  doc.roundedRect(margin, currentY, pageWidth - (margin * 2), 52, 6, 6, 'FD');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(navyDark[0], navyDark[1], navyDark[2]);
  doc.text('Directory Search Summary', margin + 12, currentY + 18);

  const todayStr = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(`Generated on: ${todayStr}`, margin + 12, currentY + 31);
  doc.text(`Total Matching Partners: ${partners.length}`, margin + 12, currentY + 43);

  // Active filters string
  const filterTokens: string[] = [];
  if (filters.country) filterTokens.push(`Country: ${filters.country}`);
  if (filters.city) filterTokens.push(`City: ${filters.city}`);
  if (filters.partnerType) filterTokens.push(`Type: ${filters.partnerType}`);
  if (filters.partnerLevel) filterTokens.push(`Tier: ${filters.partnerLevel}`);
  if (filters.service) filterTokens.push(`Service: ${filters.service}`);
  if (filters.industry) filterTokens.push(`Industry: ${filters.industry}`);
  if (filters.businessSize) filterTokens.push(`Size: ${filters.businessSize}`);
  if (filters.verifiedOnly) filterTokens.push('Verified Only');
  if (filters.searchQuery) filterTokens.push(`Keyword: "${filters.searchQuery}"`);

  const filterSummary = filterTokens.length > 0 ? filterTokens.join('  •  ') : 'All Countries & Services (Unfiltered)';

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(bluePrimary[0], bluePrimary[1], bluePrimary[2]);
  doc.text('Active Criteria: ', margin + 180, currentY + 18);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  
  // Wrap filter summary if long
  const splitFilters = doc.splitTextToSize(filterSummary, pageWidth - margin * 2 - 260);
  doc.text(splitFilters, margin + 255, currentY + 18);

  currentY += 66;

  // 3. Prepare Table Columns and Rows
  const tableHeaders = ['Partner Name & Tier', 'Location', 'Partner Type'];
  if (includeServices) tableHeaders.push('Core Services');
  if (includeMetrics) tableHeaders.push('Track Record');
  if (includeContact) tableHeaders.push('Contact Information');

  const tableRows = partners.map((p) => {
    const nameWithTier = `${p.companyName}\n[${p.partnerLevel}]${p.isVerified ? ' (✓ Verified)' : ''}`;
    const location = `${p.city},\n${p.country}`;
    const type = p.partnerType;
    
    const row = [nameWithTier, location, type];

    if (includeServices) {
      const topServices = p.services.slice(0, 3).join(', ');
      row.push(topServices + (p.services.length > 3 ? ` (+${p.services.length - 3})` : ''));
    }

    if (includeMetrics) {
      const metricsText = `${p.numberOfImplementations} Impls\n${p.yearsExperience} yrs exp • ★ ${p.rating.toFixed(1)}`;
      row.push(metricsText);
    }

    if (includeContact) {
      const contact = `${p.email}\n${p.phone}\n${p.website ? p.website.replace(/^https?:\/\//, '') : ''}`;
      row.push(contact);
    }

    return row;
  });

  // 4. Generate AutoTable with Clean Professional Theme
  autoTable(doc, {
    startY: currentY,
    head: [tableHeaders],
    body: tableRows,
    margin: { left: margin, right: margin, bottom: 45, top: 40 },
    theme: 'grid',
    headStyles: {
      fillColor: [12, 43, 100], // NextSofthr navy/blue
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.5,
      cellPadding: 6
    },
    bodyStyles: {
      textColor: [15, 23, 42],
      fontSize: 7.5,
      cellPadding: 5.5,
      lineColor: [226, 232, 240],
      lineWidth: 0.5
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: includeContact ? 110 : 130 },
      1: { cellWidth: 70 },
      2: { cellWidth: 75 }
    },
    didDrawPage: (data) => {
      // Footer on every page
      const footerY = pageHeight - 20;
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
      
      // Left note
      doc.text(
        'NextSofthr Official Partner Registry • Confidential & Verified Client Summary',
        margin,
        footerY
      );

      // Page number on right
      const pageNumber = (doc as any).internal.getCurrentPageInfo().pageNumber;
      const totalPages = (doc as any).internal.getNumberOfPages();
      doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - margin, footerY, { align: 'right' });

      // Thin bottom rule
      doc.setDrawColor(slateBorder[0], slateBorder[1], slateBorder[2]);
      doc.setLineWidth(0.5);
      doc.line(margin, footerY - 8, pageWidth - margin, footerY - 8);
    }
  });

  return doc;
}

export function downloadPartnerDirectoryPdf(
  partners: Partner[],
  filters: FilterState,
  options: PdfExportOptions = {}
): void {
  const doc = generatePartnerDirectoryPdf(partners, filters, options);
  const countrySlug = filters.country ? `-${filters.country.replace(/\s+/g, '_')}` : '';
  const dateSlug = new Date().toISOString().slice(0, 10);
  const fileName = `NextSofthr-Partner-Directory${countrySlug}-${dateSlug}.pdf`;
  doc.save(fileName);
}
