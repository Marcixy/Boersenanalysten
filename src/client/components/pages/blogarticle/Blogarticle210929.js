// material-ui icon imports
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import './Blogarticle.css';

function Blogarticle210929() {
    return (
        <div className="blog-article-page">
            <h2>MSCI World ETFs im Vergleich</h2>
            <p>29. September 2021 - <AccessTimeIcon className="time-icon" /> Geschätzte Lesezeit 6 Min</p>
            <h3>Der MSCI World-Index</h3>
            <p>
            Der MSCI World-Index enthält 23 Industrieländer mit etwa 1600 Unternehmen. Damit spiegelt dieser ETF 85%
            der Marktkapitalisierung in Industrieländern wider. Über die letzten 50 Jahre von 1970 - 2020 lag die langfristige
            Rendite des ETFs bei 7,0% p.a. . Ein sehr lesenswerter Beitrag wurde hier von Christian W. Röhl veröffentlicht 
            <a href="https://www.dividendenadel.de/msci-world-renditedreieck/" target="_blank" rel="noreferrer"> MSCI World Renditedreieck</a>.
            Etwa 2/3 der Unternehmen haben ihren Sitz in den USA oder betreiben dort ihre Hauptgeschäftstätigkeit.
            Gefolgt von Japan mit 7,14% und dem Vereinigten Königreich mit 4,1%. Alle weiteren Länder die im World-Index
            enthalten sind, sind in der folgenden Tabelle aufgelistet.<br/>
            <table>
                <tr>
                    <th>Land</th>
                    <th>Gewichtung</th>
                </tr>
                <tr>
                    <td>USA</td>
                    <td>67,56%</td>
                </tr>
                <tr>
                    <td>Japan</td>
                    <td>7,14%</td>
                </tr>
                <tr>
                    <td>Vereinigtes Königreich</td>
                    <td>4,10%</td>
                </tr>
                <tr>
                    <td>Frankreich</td>
                    <td>3,24%</td>
                </tr>
                <tr>
                    <td>Kanada</td>
                    <td>3,22%</td>
                </tr>
                <tr>
                    <td>Schweiz</td>
                    <td>2,72%</td>
                </tr>
                <tr>
                    <td>Deutschland</td>
                    <td>2,63%</td>
                </tr>
                <tr>
                    <td>Australien</td>
                    <td>1,98%</td>
                </tr>
                <tr>
                    <td>Niederlande</td>
                    <td>1,43%</td>
                </tr>
                <tr>
                    <td>Schweden</td>
                    <td>1,06%</td>
                </tr>
                <tr>
                    <td>Cash</td>
                    <td>0,33%</td>
                </tr>
                <tr>
                    <td>Andere</td>
                    <td>4,60%</td>
                </tr>
                <tfoot>
                    <tr>
                        <td colspan="3">Aufteilung im iShares Core MSCI World UCITS ETF andere MSCI World-Index ETFs können leichte Abweichungen enthalten. Stand: 30.09.21</td>
                    </tr>
                </tfoot>
            </table>
            Die größten Einzelpositionen im World-Index richten sich nach der Marktkapitalisierung des einzelnen Unternehmens.<br/>
            <table>
                <tr>
                    <th>Unternehmen</th>
                    <th>Gewichtung</th>
                    <th>Investition 10.000€</th>
                </tr>
                <tr>
                    <td>Apple</td>
                    <td>4,04%</td>
                    <td>404€</td>
                </tr>
                <tr>
                    <td>Microsoft</td>
                    <td>3,46%</td>
                    <td>346€</td>
                </tr>
                <tr>
                    <td>Amazon</td>
                    <td>2,57%</td>
                    <td>257€</td>
                </tr>
                <tr>
                    <td>Alphabet A</td>
                    <td>1,4%</td>
                    <td>140€</td>
                </tr>
                <tr>
                    <td>Facebook</td>
                    <td>1,39%</td>
                    <td>139€</td>
                </tr>
                <tr>
                    <td>Alphabet C</td>
                    <td>1,35%</td>
                    <td>135€</td>
                </tr>
                <tr>
                    <td>Tesla</td>
                    <td>1,09%</td>
                    <td>109€</td>
                </tr>
                <tr>
                    <td>Nvidia</td>
                    <td>0,88%</td>
                    <td>88€</td>
                </tr>
                <tr>
                    <td>JPMorgan Chase & Co</td>
                    <td>0,86%</td>
                    <td>86€</td>
                </tr>
                <tr>
                    <td>Johnson & Johnson</td>
                    <td>0,73%</td>
                    <td>73€</td>
                </tr>
                <tr>
                    <td>Top 10</td>
                    <td>17,77%</td>
                    <td>1777€</td>
                </tr>
                <tfoot>
                    <tr>
                        <td colspan="3">Aufteilung im iShares Core MSCI World UCITS ETF andere MSCI World-Index ETFs können leichte Abweichungen enthalten. Stand: 30.09.21</td>
                    </tr>
                </tfoot>
            </table>
            Insgesamt gibt es aktuell 18 ETFs auf den MSCI World von unterschiedlichen Anbietern. Ich werde Ihnen hier meine
            persönlichen Favoriten auf den MSCI World-Index vorstellen. Ein MSCI World ETF ist dabei ausschüttend der andere thesaurierend.
            Dies ist keine Anlageberatung und nur meine persönliche Präferenz. 
            </p>
        </div>
    )
}

export default Blogarticle210929;