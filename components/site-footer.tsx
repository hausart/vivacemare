import Image from 'next/image';
import styles from './site-footer.module.css';

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.2 1.6 6L.2 24l6.3-1.7a11.8 11.8 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.3-6.2-3.5-8.4Zm-8.4 18.1h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 0 1-1.5-5.2C2.2 6.4 6.5 2.1 12.1 2.1c2.7 0 5.1 1 7 2.9a9.8 9.8 0 0 1 2.9 7c0 5.4-4.4 9.6-9.9 9.6Zm5.4-7.2c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-2-.9-3.3-1.6-4.6-3.7-.4-.7.4-.7 1.1-2.2.1-.2 0-.4 0-.5l-.9-2.1c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1c.2.2 2 3.1 4.9 4.3 1.8.8 2.5.8 3.4.7.5-.1 1.7-.7 1.9-1.4.3-.7.3-1.3.2-1.1Z" /></svg>;
}

function LinkedinIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.3 3.7A2.3 2.3 0 1 1 .7 3.7a2.3 2.3 0 0 1 4.6 0ZM1 8h4.4v14H1V8Zm7 0h4.2v1.9h.1c.6-1.1 2-2.3 4.2-2.3 4.5 0 5.3 3 5.3 6.8V22h-4.4v-6.7c0-1.6 0-3.7-2.3-3.7s-2.6 1.8-2.6 3.6V22H8V8Z" /></svg>;
}

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 1h9.6A6.2 6.2 0 0 1 23 7.2v9.6a6.2 6.2 0 0 1-6.2 6.2H7.2A6.2 6.2 0 0 1 1 16.8V7.2A6.2 6.2 0 0 1 7.2 1Zm-.2 2A4 4 0 0 0 3 7v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4H7Zm5 3.3a5.7 5.7 0 1 1 0 11.4 5.7 5.7 0 0 1 0-11.4Zm0 2a3.7 3.7 0 1 0 0 7.4 3.7 3.7 0 0 0 0-7.4Zm6-3.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Z" /></svg>;
}

export function SiteFooter() {
  return (
    <footer className={styles.footer} id="rodape">
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div className={styles.brands} aria-label="Vivacemare Investimentos e Safra Invest">
            <Image src="/assets/logo-vivace-light.svg" alt="Vivacemare Investimentos" width={184} height={28} />
            <span className={styles.divider} aria-hidden="true" />
            <Image src="/assets/logo-safra-light.svg" alt="Safra Invest" width={166} height={25} />
          </div>
          <nav className={styles.socials} aria-label="Redes sociais">
            <a href="https://wa.me/5513992056715" target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsAppIcon /></a>
            <a href="https://www.linkedin.com/company/vivaceinvestimentos/home/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
            <a href="https://www.instagram.com/vivaceinvestimentos/" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
          </nav>
        </div>
        <p className={styles.legal}>
          <strong>VIVACEMARE AI LTDA.</strong>, inscrita no CNPJ nº 60.302.471/0001-86, com sede na Avenida Almirante Cochrane, nº 47, 4º andar, Edifício Arias Tower, Embaré, Santos/SP, CEP 11040-001.<br />
          <strong>Vivacemare — Assessoria de Investimentos. Escritório credenciado ao Safra Invest.</strong><br />
          A atividade de assessoria de investimentos está sujeita à regulamentação da Comissão de Valores Mobiliários (CVM), especialmente à Resolução CVM nº 178/2023.<br />
          As informações disponibilizadas neste site possuem caráter institucional e informativo, não constituindo oferta de investimentos, serviço de consultoria de valores mobiliários ou garantia de rentabilidade. Investimentos envolvem riscos, e resultados passados não representam garantia de resultados futuros.
        </p>
      </div>
    </footer>
  );
}
