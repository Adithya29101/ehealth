import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const downloadTicketPDF = async (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      onclone: (clonedDoc) => {
        // Replace oklch styles on the cloned ticket element with standard hex/rgb
        const ticket = clonedDoc.getElementById(elementId);
        if (ticket) {
          ticket.style.backgroundColor = '#ffffff';
          ticket.style.color = '#000000';
        }
      },
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save('eHealth_OP_Ticket.pdf');
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};