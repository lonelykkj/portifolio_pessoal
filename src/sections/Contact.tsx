import { Folder } from '@/components/portfolio/Folder'
import { Arrow } from '@/components/portfolio/icons'
import { usePortfolio } from '@/components/portfolio/PortfolioContext'
import { SheetHeading, SheetMeta } from '@/components/portfolio/SheetFrame'
import { StrokeText } from '@/components/portfolio/StrokeText'

export function Contact({ onCopyEmail }: { onCopyEmail: () => void }) {
  const { data, sheetProps } = usePortfolio()
  const { email, contacts, years } = data
  const lastYear = years.split(/[–-]/).pop()

  return (
    <section className="ftp-sheet ftp-rv" {...sheetProps('contact')}>
      <SheetMeta id="contact" />
      <SheetHeading id="contact" tag="(:)" word="Contato" withSignature />
      <div className="ftp-stack">
        <Folder
          tone="blue"
          tabAt={0.78}
          tab={
            <>
              Conversa <Arrow size={12} />
            </>
          }
        >
          <div className="ftp-talk">
            <StrokeText
              text="Vamos conversar :)"
              weight={15}
              tracking={22}
              color="#ffffff"
              label="Vamos conversar"
            />
            <p>
              Disponível para novos projetos de sites e sistemas web em {lastYear}. Conte sua
              ideia, tire dúvidas ou peça um orçamento, será um prazer conversar.
            </p>
          </div>
        </Folder>
        <Folder
          tone="green"
          tabAt={0.56}
          tab={
            <>
              E-mail <Arrow size={12} />
            </>
          }
        >
          <div className="ftp-mail">
            <a className="ftp-mail-a" href={`mailto:${email}`}>
              {email}
            </a>
            <div className="ftp-btns">
              <button type="button" className="ftp-btn" onClick={onCopyEmail}>
                Copiar
              </button>
              <a className="ftp-btn" data-ghost="true" href={`mailto:${email}`}>
                Escrever <Arrow dir="ne" />
              </a>
            </div>
          </div>
        </Folder>
        {contacts.length > 0 && (
          <Folder
            tone="sheet"
            tabAt={0.3}
            style={{ filter: 'drop-shadow(0 -6px 14px rgba(27,34,52,.08))' }}
            tab={
              <>
                Redes <Arrow size={12} />
              </>
            }
          >
            <div className="ftp-else">
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href || '#'}
                  target={contact.href ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  <span>
                    <small>{contact.label}</small>
                    {contact.value}
                  </span>
                  <Arrow dir="ne" />
                </a>
              ))}
            </div>
          </Folder>
        )}
      </div>
    </section>
  )
}
