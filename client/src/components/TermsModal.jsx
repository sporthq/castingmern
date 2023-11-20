import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from '@chakra-ui/react';

export default function TermsModal({ isOpen, onClose }) {
	return (
		<>
			{/* <Button onClick={onOpen}>Open Modal</Button> */}

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader className='text-center'>Regulamin</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<div className='text-center mb-4'>
							<p>
								{' '}
								Serwis internetowy www.castingi.com.pl prowadzony jest przez Jakuba Stój, prowadzącego działalność
								nierejestrowaną w Centralnej Ewidencji i Informacji o Działalności Gospodarczej (CEIDG) prowadzonej
								przez ministra właściwego ds. gospodarki. Niniejszy Regulamin określa ogólne warunki, zasady oraz sposób
								świadczenia usług drogą elektroniczną przez Serwis internetowy www.castingi.com.pl z siedzibą ul.
								Strzelecka 27/29 m.163, 03-433 Warszawa (zwanym dalej: „Serwisem Internetowym”).
							</p>
							<br className='mb-2'></br>
							<h4 className='font-semibold mb-2'>§1 Definicje</h4>
							<p>
								§ 1 Definicje Hasło - ciąg znaków literowych, cyfrowych lub innych wybranych przez Użytkownika podczas
								rejestracji w Serwisie Internetowym wykorzystywanych w celu zabezpieczenia dostępu do Konta Użytkownika
								w Serwisie Internetowym. Konto Użytkownika - indywidualny dla każdego Użytkownika panel zamieszczony na
								Stronie Internetowej Serwisu, uruchomiony na jego rzecz przez Usługodawcę, po dokonaniu przez
								Użytkownika Rejestracji. Oferta – oferta przedstawiona przez Usługodawcę za pośrednictwem wiadomości
								elektronicznej, przesłanej Użytkownikowi na skutek skierowania przez niego zapytania ofertowego,
								złożonego za pośrednictwem Formularza kontaktowego lub za pośrednictwem poczty elektronicznej.
								Przedsiębiorca - osoba fizyczna, osoba prawna lub jednostka organizacyjna niebędącą osobą prawną, której
								ustawa przyznaje zdolność prawną, prowadzącą we własnym imieniu działalność gospodarczą lub zawodową
								i dokonującą czynności prawnej związanej bezpośrednio z jej działalnością gospodarczą lub zawodową.
								Konsument - osoba fizyczna dokonująca czynności prawnej niezwiązanej bezpośrednio z jej działalnością
								gospodarczą lub zawodową. Regulamin - niniejszy regulamin Serwisu świadczenia usług drogą elektroniczną.
								Rejestracja - czynność faktyczną dokonaną w sposób określony w Regulaminie, wymaganą dla korzystania
								przez Użytkownika ze wszystkich funkcjonalności Serwisu Internetowego. Strona Internetowa Serwisu -
								strona internetowa, pod którą Usługodawca prowadzi Serwis Internetowy. Umowa - umowa zawarta na
								odległość, na zasadach określonych w Regulaminie, między Użytkownikiem a Usługodawcą. Usługodawca –
								osoba fizyczna – Jakub Stój, prowadzący działalność nierejestrowaną w Centralnej Ewidencji i Informacji
								o Działalności Gospodarczej (CEIDG) prowadzonej przez ministra właściwego ds. gospodarki. e-mail:
								castingpolska@op.pl, będący jednocześnie właścicielem Serwisu Internetowego www.castingi.com.pl
								Użytkownik - oznacza podmiot, na rzecz którego zgodnie z Regulaminem i przepisami prawa mogą być
								świadczone usługi drogą elektroniczną.
							</p>
						</div>
						<div className='text-center mb-4'>
							<h4 className='font-semibold mb-2'>§2 Postanowienia ogólne</h4>
							<p>
								Wszelkie prawa do Serwisu Internetowego, w tym majątkowe prawa autorskie, prawa własności intelektualnej
								do jego nazwy, domeny internetowej, Strony Internetowej Serwisu, a także do wzorców, formularzy,
								logotypów należą do Usługodawcy, a korzystanie z nich może następować wyłącznie w sposób określony
								i zgodny z Regulaminem. Usługodawca dołoży starań, aby korzystanie z Serwisu Internetowego było możliwe
								dla Użytkowników Internetu z użyciem wszystkich popularnych przeglądarek internetowych, systemów
								operacyjnych, typów urządzeń oraz typów połączeń internetowych. Minimalne wymagania techniczne
								umożliwiające korzystanie ze Strony Internetowej Serwisu to przeglądarka internetowa w wersji co
								najmniej Internet Explorer 11 lub Chrome 66 lub FireFox 60 lub Opera 53 lub Safari 5 lub nowszych,
								z włączoną obsługą języka Javascript, akceptująca pliki typu „cookies” oraz łącze internetowe
								o przepustowości co najmniej 512 kbit/s. Strona Internetowa Serwisu jest zoptymalizowana dla minimalnej
								rozdzielczości ekranu 1024x768 pikseli. Usługodawca stosuje mechanizm plików "cookies", które podczas
								korzystania przez Użytkowników ze Strony Internetowej Serwisu, zapisywane są przez serwer Usługodawcy na
								urządzeniu końcowym Użytkownika. Stosowanie plików "cookies" ma na celu poprawne działanie Strony
								Internetowej Serwisu na urządzeniach końcowych Użytkowników. Mechanizm ten nie niszczy urządzenia
								końcowego Użytkownika oraz nie powoduje zmian konfiguracyjnych w urządzeniach końcowych Użytkowników ani
								w oprogramowaniu zainstalowanym na tych urządzeniach. Każdy Użytkownik może wyłączyć mechanizm „cookies”
								w przeglądarce internetowej swojego urządzenia końcowego. Usługodawca wskazuje, że wyłączenie „cookies”
								może jednak spowodować utrudnienia lub uniemożliwić korzystanie ze Strony Internetowej Serwisu. W celu
								złożenia zamówienia w Serwisie Internetowym za pośrednictwem poczty elektronicznej oraz w celu
								korzystania z usług dostępnych na Stronach Internetowych Serwisu, konieczne jest posiadanie przez
								Użytkownika aktywnego konta poczty elektronicznej. Zakazane jest dostarczanie przez Użytkownika treści
								o charakterze bezprawnym oraz wykorzystywanie przez Użytkownika Serwisu Internetowego, Strony
								Internetowej Serwisu lub usług świadczonych przez Usługodawcę, w sposób sprzeczny z prawem, dobrymi
								obyczajami, naruszający dobra osobiste osób trzecich lub uzasadnione interesy Usługodawcy. Usługodawca
								oświadcza, iż publiczny charakter sieci Internet i korzystanie z usług świadczonych drogą elektroniczną
								wiązać może się z zagrożeniem pozyskania i modyfikowania danych Użytkowników przez osoby nieuprawnione,
								dlatego Użytkownicy powinni stosować właściwe środki techniczne, które zminimalizują wskazane wyżej
								zagrożenia. W szczególności stosować programy antywirusowe i chroniące tożsamość korzystających z sieci
								Internet. Użytkownik jest uprawniony do korzystania z zasobów Serwisu Internetowego wyłącznie na własny
								użytek. Nie jest dopuszczalne wykorzystywanie zasobów i funkcji Serwisu Internetowego w celu prowadzenia
								przez Użytkownika działalności, która naruszałaby interes Usługodawcy. § 3 Kontakt z Serwisem 1. Adres
								Serwisu: ul. Strzelecka 27/29 m163, 03-433 Warszawa 2. Adres e-mail Serwisu: castingpolska@op.pl 3.
								Numer telefonu Serwisu: +48 663 724 125 4. Numer rachunku bankowego Serwisu: 07 2490 0005 0000 4000 2061
								6004 5. Użytkownik może porozumiewać się z Serwisem za pomocą adresów i numerów telefonów podanych w
								niniejszym paragrafie. § 4 Sposób korzystania z Serwisu 1. Użytkownik zobowiązany jest do korzystania
								z Serwisu w sposób zgodny z Regulaminem, przepisami prawa, zasadami współżycia społecznego, zwyczajami
								przyjętymi w Internecie (Netykieta) oraz dobrymi obyczajami. 2. Użytkownik w szczególności zobowiązany
								jest do: ◦ powstrzymywania się od działań mogących utrudnić lub zakłócić funkcjonowanie Serwisu,
								w szczególności mogących utrudnić korzystanie z Serwisu przez innych Użytkowników; ◦ nieprzekazywania
								nieprawdziwych danych osobowych; ◦ powstrzymywania się od działań mogących naruszyć prywatność innych
								Użytkowników, w szczególności zbierania, przetwarzania oraz rozpowszechniania informacji o innych
								Użytkownikach bez ich jednostkowo wyrażonej zgody, jak również powstrzymywania się od naruszania
								tajemnicy korespondencji; ◦ niewykorzystywania Serwisu – również pośrednio – w celu rozsyłania
								niezamówionej informacji handlowej; ◦ aktualizacji danych niezbędnych do kontaktu; ◦ powstrzymywania się
								od działań naruszających dobre imię Serwisu oraz podmiotów z nim współpracujących; ◦ powstrzymania się
								od jakichkolwiek działań naruszających prywatność i dobre imię innych osób; ◦ nieumieszczania w Serwisie
								oraz nieprzekazywania za jego pośrednictwem treści lub materiałów sprzecznych z obowiązującym prawem lub
								z zasadami współżycia społecznego, treści wulgarnych, obscenicznych i pornograficznych, treści uważanych
								powszechnie za obraźliwe, naruszających dobra osobiste innych osób; ◦ niekorzystania z cudzego
								wizerunku, nienakłaniania do popełnienia przestępstwa, niepropagowania przemocy, powstrzymywania się od
								postępowań nagannych moralnie, naruszających dobre obyczaje i zasady Netykiety; ◦ powstrzymywania się od
								innych zachowań, które mogłyby zostać obiektywnie uznane za zachowania oczywiście niepożądane, naganne
								lub sprzeczne z przeznaczeniem.
							</p>
						</div>
						<div className='text-center mb-4'>
							<h4 className='font-semibold mb-2'>§3 Kontakt z Serwisem</h4>
							<p>
								1. Adres Serwisu: ul. Strzelecka 27/29 m163, 03-433 Warszawa 2. Adres e-mail Serwisu:
								castingpolska@op.pl 3. Numer telefonu Serwisu: +48 663 724 125 4. Numer rachunku bankowego Serwisu: 07
								2490 0005 0000 4000 2061 6004 5. Użytkownik może porozumiewać się z Serwisem za pomocą adresów i numerów
								telefonów podanych w niniejszym paragrafie.
							</p>
						</div>
						<div className='text-center mb-4'>
							<h4 className='font-semibold mb-2'>§4 Sposób korzystania z Serwisu </h4>
							<p>
								1. Użytkownik zobowiązany jest do korzystania z Serwisu w sposób zgodny z Regulaminem, przepisami prawa,
								zasadami współżycia społecznego, zwyczajami przyjętymi w Internecie (Netykieta) oraz dobrymi obyczajami.
								2. Użytkownik w szczególności zobowiązany jest do: ◦ powstrzymywania się od działań mogących utrudnić
								lub zakłócić funkcjonowanie Serwisu, w szczególności mogących utrudnić korzystanie z Serwisu przez
								innych Użytkowników; ◦ nieprzekazywania nieprawdziwych danych osobowych; ◦ powstrzymywania się od
								działań mogących naruszyć prywatność innych Użytkowników, w szczególności zbierania, przetwarzania oraz
								rozpowszechniania informacji o innych Użytkownikach bez ich jednostkowo wyrażonej zgody, jak również
								powstrzymywania się od naruszania tajemnicy korespondencji; ◦ niewykorzystywania Serwisu – również
								pośrednio – w celu rozsyłania niezamówionej informacji handlowej; ◦ aktualizacji danych niezbędnych do
								kontaktu; ◦ powstrzymywania się od działań naruszających dobre imię Serwisu oraz podmiotów z nim
								współpracujących; ◦ powstrzymania się od jakichkolwiek działań naruszających prywatność i dobre imię
								innych osób; ◦ nieumieszczania w Serwisie oraz nieprzekazywania za jego pośrednictwem treści lub
								materiałów sprzecznych z obowiązującym prawem lub z zasadami współżycia społecznego, treści wulgarnych,
								obscenicznych i pornograficznych, treści uważanych powszechnie za obraźliwe, naruszających dobra
								osobiste innych osób; ◦ niekorzystania z cudzego wizerunku, nienakłaniania do popełnienia przestępstwa,
								niepropagowania przemocy, powstrzymywania się od postępowań nagannych moralnie, naruszających dobre
								obyczaje i zasady Netykiety; ◦ powstrzymywania się od innych zachowań, które mogłyby zostać obiektywnie
								uznane za zachowania oczywiście niepożądane, naganne lub sprzeczne z przeznaczeniem.
							</p>
						</div>
						<div className='text-center mb-4'>
							<h4 className='font-semibold mb-2'>§5 Świadczenie usług </h4>
							<p>
								1. Usługodawca świadczy na rzecz Użytkowników, drogą elektroniczną następujące usługi nieodpłatne:   a)
								Formularz kontaktowy b) Realizacja zamówionych usług c) Prezentacja oferty lub informacji   d) Obsługa
								zapytań przez formularz Usługi świadczone są 5 dni w tygodniu, od poniedziałku do piątku. 2. 3. 4.
								Usługodawca zastrzega sobie możliwość wyboru i zmiany rodzaju, form, czasu oraz sposobu udzielania
								dostępu do wybranych wymienionych usług, o czym poinformuje Użytkowników w sposób właściwy dla zmiany
								Regulaminu. Użytkownik oświadcza, że zamieszczając na stronie zdjęcia lub/i komentarze jest ich autorem,
								a Usługodawca ma prawo do użycia ich na swojej stronie. Usługa Formularz kontaktowy, polega na wysłaniu
								za pomocą Formularza umieszczonego w Serwisie wiadomości do Usługodawcy. W celu skorzystania z usługi
								Formularz kontaktowy Użytkownik wypełnia Formularz udostępniony w Serwisie i przesyła wypełniony
								Formularz drogą elektroniczną do Usługodawcy poprzez wybór odpowiedniej funkcji znajdującej się
								w Formularzu. 5. 6. Rezygnacja z usługi Formularz kontaktowy możliwa jest w każdej chwili i polega na
								zaprzestaniu wysyłania wiadomości do Usługodawcy. Usługodawca jest uprawniony do zablokowania usług
								świadczonych drogą elektroniczną w przypadku działania przez Użytkownika na szkodę Usługodawcy lub
								innych Użytkowników, naruszenia przez Użytkownika przepisów prawa lub postanowień Regulaminu a także,
								gdy zablokowanie dostępu Użytkownika do usług świadczonych drogą elektroniczną jest uzasadnione
								względami bezpieczeństwa - w szczególności: przełamywaniem przez Użytkownika zabezpieczeń Serwisu lub
								inne działania hakerskie. Zablokowanie dostępu Użytkownika do usług świadczonych drogą elektroniczną
								z wymienionych przyczyn trwa przez okres niezbędny do rozwiązania kwestii stanowiącej podstawę
								zablokowania dostępu Użytkownika do usług świadczonych drogą elektroniczną. Usługodawca drogą
								elektroniczną zawiadamia Użytkownika o zamiarze zablokowania dostępu Użytkownika do usług świadczonych
								drogą elektroniczną na adres podany przez Użytkownika w formularzu rejestracyjnym.
							</p>
						</div>
						<div className='text-center mb-4'>
							<h4 className='font-semibold mb-2'>§6 Przedmiot działalności Serwisu </h4>
							<p>
								1. Przedmiotem działalności Serwisu są usługi dla agencji filmowych / artystycznych. 2. Usługa polega na
								przedstawieniu oferty na plan filmowy osobom zainteresowanym, kolejnym etapem jest przesłanie danych
								kontaktowych do agencji filmowej, która na podstawie swoich wytycznych zdecyduje, czy takową osobą
								zatrudni na plan filmowy.
							</p>
						</div>
						<div className='text-center mb-4'>
							<h4 className='font-semibold mb-2'>§7 Postępowanie reklamacyjne </h4>
							<p>
								Użytkownik może zgłosić Usługodawcy reklamacje w związku z korzystaniem z usług świadczonych drogą
								elektroniczną przez Usługodawcę. Reklamacja może być złożona w formie elektronicznej i przesłana na
								adres elektroniczny Usługodawcy:.castingpolska@op.pl. W zgłoszeniu reklamacyjnym Użytkownik winien
								zawrzeć opis zaistniałego problemu. Usługodawca niezwłocznie, lecz nie później niż w terminie 14 dni
								rozpatruje reklamacje i udziela odpowiedzi na adres poczty elektronicznej Użytkownika, podany
								w zgłoszeniu reklamacji.
							</p>
						</div>
						<div className='text-center mb-4'>
							<h4 className='font-semibold mb-2'>§8 Odpowiedzialność Usługodawcy </h4>
							<p>
								Usługodawca ponosi odpowiedzialność z tytułu niewykonania lub nienależytego wykonania umowy. W przypadku
								umów zawieranych z Klientami będącymi Przedsiębiorcami Usługodawca ponosi odpowiedzialność tylko
								w przypadku umyślnego wyrządzenia szkody i w granicach rzeczywiście poniesionych strat przez Usługodawca
								ponosi odpowiedzialność z tytułu niewykonania lub nienależytego wykonania umowy. W przypadku umów
								zawieranych z Klientami będącymi Przedsiębiorcami Usługodawca ponosi odpowiedzialność tylko w przypadku
								umyślnego wyrządzenia szkody i w granicach rzeczywiście poniesionych strat przez klienta będącego
								Przedsiębiorcą.
							</p>
						</div>
						<div className='text-center mb-4'>
							<h4 className='font-semibold mb-2'>§9 Ochrona danych osobowych </h4>
							<p>
								Zasady ochrony Danych Osobowych zamieszczone są w Polityce prywatności. Administratorem danych osobowych
								Klientów zbieranych za pośrednictwem Serwisu internetowego jest Usługodawca. Dane osobowe Użytkowników
								zbierane przez Administratora za pośrednictwem Serwisu internetowego zbierane są w celu realizacji Umowy
								sprzedaży usług drogą elektroniczną, a jeżeli Użytkownik wyrazi na to zgodę - także w celu
								marketingowym. Użytkownik ma prawo dostępu do treści swoich danych oraz ich poprawiania. Podanie danych
								osobowych jest dobrowolne, aczkolwiek niepodanie wskazanych w Regulaminie danych osobowych niezbędnych
								do zawarcia Umowy sprzedaży usług drogą elektroniczną skutkuje brakiem możliwości zawarcia tejże umowy.
							</p>
						</div>
						<div className='text-center mb-4'>
							<h4 className='font-semibold mb-2'>§10 Rozwiązanie umowy </h4>
							<p>
								Strony mogą rozwiązać umowę o świadczenie usługi drogą elektroniczną poprzez złożenie stosownego
								oświadczenia woli, w szczególności przy użyciu dowolnego środka komunikacji na odległość, w sposób
								umożliwiający drugiej stronie zapoznanie się z nim. Zarówno Użytkownik, jak i Usługodawca mogą rozwiązać
								umowę o świadczenie usług drogą elektroniczną w każdym czasie i bez podania przyczyn, z zastrzeżeniem
								zachowania praw nabytych przez drugą stronę przed rozwiązaniem ww. umowy oraz postanowień poniżej.
							</p>
						</div>
						<div className='text-center mb-4'>
							<h4 className='font-semibold mb-2'>
								§11 Pozasądowe sposoby rozpatrywania reklamacji i dochodzenia roszczeń{' '}
							</h4>
							<p>
								1. Szczegółowe informacje dotyczące możliwości skorzystania przez Konsumenta z pozasądowych sposobów
								rozpatrywania reklamacji i dochodzenia roszczeń oraz zasady dostępu do tych procedur dostępne są w
								siedzibach oraz na stronach internetowych powiatowych (miejskich) rzeczników konsumentów, organizacji
								społecznych, do których zadań statutowych należy ochrona konsumentów, Wojewódzkich Inspektoratów
								Inspekcji Handlowej oraz pod następującymi adresami internetowymi Urzędu Ochrony Konkurencji i
								Konsumentów: http://www.uokik.gov.pl/spory_konsumenckie.php;
								http://www.uokik.gov.pl/sprawy_indywidualne.php http://www.uokik.gov.pl/wazne_adresy.php. 2. Konsument
								posiada następujące możliwości skorzystania z pozasądowych sposobów rozpatrywania reklamacji i
								dochodzenia roszczeń: a. Konsument uprawniony jest do zwrócenia się do stałego polubownego sądu
								konsumenckiego, o którym mowa w art. 37 ustawy z dnia 15 grudnia 2000 r. o Inspekcji Handlowej (Dz.U. z
								2014 r. poz. 148 z późn. zm.), z wnioskiem o rozstrzygnięcie sporu wynikłego z Umowy zawartej z
								Usługodawcą. b. Konsument uprawniony jest do zwrócenia się do wojewódzkiego inspektora Inspekcji
								Handlowej, zgodnie z art. 36 ustawy z dnia 15 grudnia 2000 r. o Inspekcji Handlowej (Dz.U. z 2014 r.
								poz. 148 z późn. zm.), z wnioskiem o wszczęcie postępowania mediacyjnego w sprawie polubownego
								zakończenia sporu między Konsumentem a Usługodawcą. c. Konsument może uzyskać bezpłatną pomoc w sprawie
								rozstrzygnięcia sporu między nim a Usługodawcą, korzystając także z bezpłatnej pomocy powiatowego
								(miejskiego) rzecznika konsumentów lub organizacji społecznej, do której zadań statutowych należy
								ochrona konsumentów (m.in. Federacja Konsumentów, Stowarzyszenie Konsumentów Polskich).
							</p>
						</div>
						<div className='text-center mb-4'>
							<h4 className='font-semibold mb-2'>§12 Postanowienia końcowe </h4>
							<p>
								1. Usługodawca ponosi odpowiedzialność z tytułu niewykonania lub nienależytego wykonania umowy, lecz
								w przypadku umów zawieranych z Użytkownikami będącymi Przedsiębiorcami Usługodawca ponosi
								odpowiedzialność tylko w przypadku umyślnego wyrządzenia szkody i w granicach rzeczywiście poniesionych
								strat przez Użytkownika będącego Przedsiębiorcą. 2. Treść niniejszego Regulaminu może zostać utrwalona
								poprzez wydrukowanie, zapisanie na nośniku lub pobranie w każdej chwili z Serwisu. 3. W przypadku
								powstania sporu na gruncie zawartej umowy o świadczenie usługi drogą elektroniczną, strony będą dążyły
								do rozwiązania sprawy polubownie. Prawem właściwym dla rozstrzygania wszelkich sporów powstałych na
								gruncie niniejszego Regulaminu jest prawo polskie. 4. Usługodawca zastrzega sobie prawo zmiany
								niniejszego Regulaminu. Wszystkie umowy o świadczenie usługi drogą elektroniczną zawarte przed dniem
								wejścia w życie nowego Regulaminu są realizowane na podstawie Regulaminu, który obowiązywał w dniu
								zawarcia umowy o świadczenie usługi drogą elektroniczną. Zmiana Regulaminu wchodzi w życie w terminie 7
								dni od opublikowania na Stronie Internetowej Serwisu. Usługodawca poinformuje Użytkownika na 7 dni przed
								wejściem w życie nowego Regulaminu o zmianie Regulaminu za pomocą wiadomości przesłanej drogą
								elektroniczną zawierającej odnośnik do tekstu zmienionego Regulaminu. W razie, gdy Użytkownik nie
								akceptuje nowej treści Regulaminu obowiązany jest zawiadomić o tym fakcie Usługodawcę, co skutkuje
								rozwiązaniem umowy. 5. Umowy z Usługodawcą zawierane są w języku polskim.
							</p>
						</div>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='orange' mr={3} onClick={onClose}>
							Przeczytałem
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
