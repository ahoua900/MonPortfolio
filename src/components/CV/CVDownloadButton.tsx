import { PDFDownloadLink } from '@react-pdf/renderer';
import { CVDocument } from './CVDocument';

interface Props {
  label: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const CVDownloadButton = ({ label, className, style, children }: Props) => (
  <PDFDownloadLink
    document={<CVDocument />}
    fileName="CV-AHOUA-Elvis-Ghislain.pdf"
    style={{ textDecoration: 'none' }}
  >
    {({ loading }) => (
      <span className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', ...style }}>
        {children}
        {loading ? 'Génération...' : label}
      </span>
    )}
  </PDFDownloadLink>
);
