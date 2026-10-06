import { profile } from '../data/portfolio';
import { ProximityText, RollText } from './Kinetic';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-row">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.location}</span>
        <a href="#home" className="text-link"><RollText text="Back to top ↑" /></a>
      </div>
      <ProximityText text={profile.shortName} className="footer-giant" min={150} max={900} radius={360} decorative />
    </footer>
  );
}
