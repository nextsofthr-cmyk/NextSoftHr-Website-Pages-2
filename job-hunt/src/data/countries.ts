export interface CountryItem {
  code: string;
  name: string;
  flag: string;
  region: 'Africa' | 'Europe' | 'Americas' | 'Asia' | 'Oceania' | 'Middle East';
  popular?: boolean;
  majorCities?: string[];
}

export const SPECIAL_LOCATIONS = [
  { label: 'All Countries / Worldwide', value: '', flag: '🌐' },
  { label: 'Remote (Worldwide / Anywhere)', value: 'Remote', flag: '🌍' },
  { label: 'Pan-Africa (All African Countries)', value: 'Pan-Africa', flag: '🌍' },
];

export const WORLD_COUNTRIES: CountryItem[] = [
  // --- African Tech Hubs & Countries ---
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', region: 'Africa', popular: true, majorCities: ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Enugu', 'Kano', 'Victoria Island', 'Lekki', 'Ikoyi', 'Marina', 'Ikeja', 'Yaba'] },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', region: 'Africa', popular: true, majorCities: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Westlands'] },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', region: 'Africa', popular: true, majorCities: ['Accra', 'Kumasi', 'Tema', 'Takoradi', 'Airport City'] },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', region: 'Africa', popular: true, majorCities: ['Johannesburg', 'Cape Town', 'Durban', 'Pretoria', 'Sandton', 'Rosebank'] },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼', region: 'Africa', popular: true, majorCities: ['Kigali', 'Rubavu', 'Musanze'] },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', region: 'Middle East', popular: true, majorCities: ['Cairo', 'Alexandria', 'Giza', 'New Cairo'] },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿', region: 'Africa', majorCities: ['Algiers', 'Oran', 'Constantine'] },
  { code: 'AO', name: 'Angola', flag: '🇦🇴', region: 'Africa', majorCities: ['Luanda', 'Benguela', 'Huambo'] },
  { code: 'BJ', name: 'Benin', flag: '🇧🇯', region: 'Africa', majorCities: ['Cotonou', 'Porto-Novo'] },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼', region: 'Africa', majorCities: ['Gaborone', 'Francistown'] },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', region: 'Africa', majorCities: ['Ouagadougou', 'Bobo-Dioulasso'] },
  { code: 'BI', name: 'Burundi', flag: '🇧🇮', region: 'Africa', majorCities: ['Bujumbura', 'Gitega'] },
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲', region: 'Africa', majorCities: ['Douala', 'Yaoundé', 'Bamenda'] },
  { code: 'CV', name: 'Cape Verde', flag: '🇨🇻', region: 'Africa', majorCities: ['Praia', 'Mindelo'] },
  { code: 'CF', name: 'Central African Republic', flag: '🇨🇫', region: 'Africa', majorCities: ['Bangui'] },
  { code: 'TD', name: 'Chad', flag: '🇹🇩', region: 'Africa', majorCities: ["N'Djamena"] },
  { code: 'KM', name: 'Comoros', flag: '🇰🇲', region: 'Africa', majorCities: ['Moroni'] },
  { code: 'CG', name: 'Congo (Republic)', flag: '🇨🇬', region: 'Africa', majorCities: ['Brazzaville', 'Pointe-Noire'] },
  { code: 'CD', name: 'DR Congo', flag: '🇨🇩', region: 'Africa', majorCities: ['Kinshasa', 'Lubumbashi', 'Goma'] },
  { code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮', region: 'Africa', popular: true, majorCities: ['Abidjan', 'Yamoussoukro', 'Bouaké'] },
  { code: 'DJ', name: 'Djibouti', flag: '🇩🇯', region: 'Africa', majorCities: ['Djibouti City'] },
  { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶', region: 'Africa', majorCities: ['Malabo', 'Bata'] },
  { code: 'ER', name: 'Eritrea', flag: '🇪🇷', region: 'Africa', majorCities: ['Asmara'] },
  { code: 'SZ', name: 'Eswatini', flag: '🇸🇿', region: 'Africa', majorCities: ['Mbabane', 'Manzini'] },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', region: 'Africa', popular: true, majorCities: ['Addis Ababa', 'Dire Dawa'] },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦', region: 'Africa', majorCities: ['Libreville', 'Port-Gentil'] },
  { code: 'GM', name: 'Gambia', flag: '🇬🇲', region: 'Africa', majorCities: ['Banjul', 'Serekunda'] },
  { code: 'GN', name: 'Guinea', flag: '🇬🇳', region: 'Africa', majorCities: ['Conakry'] },
  { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼', region: 'Africa', majorCities: ['Bissau'] },
  { code: 'LS', name: 'Lesotho', flag: '🇱🇸', region: 'Africa', majorCities: ['Maseru'] },
  { code: 'LR', name: 'Liberia', flag: '🇱🇷', region: 'Africa', majorCities: ['Monrovia'] },
  { code: 'LY', name: 'Libya', flag: '🇱🇾', region: 'Africa', majorCities: ['Tripoli', 'Benghazi'] },
  { code: 'MG', name: 'Madagascar', flag: '🇲🇬', region: 'Africa', majorCities: ['Antananarivo'] },
  { code: 'MW', name: 'Malawi', flag: '🇲🇼', region: 'Africa', majorCities: ['Lilongwe', 'Blantyre'] },
  { code: 'ML', name: 'Mali', flag: '🇲🇱', region: 'Africa', majorCities: ['Bamako'] },
  { code: 'MR', name: 'Mauritania', flag: '🇲🇷', region: 'Africa', majorCities: ['Nouakchott'] },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺', region: 'Africa', popular: true, majorCities: ['Port Louis', 'Ebene Cybercity'] },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', region: 'Africa', popular: true, majorCities: ['Casablanca', 'Rabat', 'Marrakech', 'Tangier'] },
  { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', region: 'Africa', majorCities: ['Maputo', 'Matola'] },
  { code: 'NA', name: 'Namibia', flag: '🇳🇦', region: 'Africa', majorCities: ['Windhoek', 'Walvis Bay'] },
  { code: 'NE', name: 'Niger', flag: '🇳🇪', region: 'Africa', majorCities: ['Niamey'] },
  { code: 'ST', name: 'Sao Tome and Principe', flag: '🇸🇹', region: 'Africa', majorCities: ['São Tomé'] },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳', region: 'Africa', popular: true, majorCities: ['Dakar', 'Touba', 'Thiès'] },
  { code: 'SC', name: 'Seychelles', flag: '🇸🇨', region: 'Africa', majorCities: ['Victoria'] },
  { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', region: 'Africa', majorCities: ['Freetown'] },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴', region: 'Africa', majorCities: ['Mogadishu'] },
  { code: 'SS', name: 'South Sudan', flag: '🇸🇸', region: 'Africa', majorCities: ['Juba'] },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩', region: 'Africa', majorCities: ['Khartoum'] },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', region: 'Africa', popular: true, majorCities: ['Dar es Salaam', 'Dodoma', 'Arusha', 'Zanzibar'] },
  { code: 'TG', name: 'Togo', flag: '🇹🇬', region: 'Africa', majorCities: ['Lomé'] },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳', region: 'Africa', majorCities: ['Tunis', 'Sfax', 'Sousse'] },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬', region: 'Africa', popular: true, majorCities: ['Kampala', 'Entebbe', 'Jinja'] },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲', region: 'Africa', majorCities: ['Lusaka', 'Kitwe', 'Ndola'] },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', region: 'Africa', majorCities: ['Harare', 'Bulawayo'] },

  // --- North & South America ---
  { code: 'US', name: 'United States', flag: '🇺🇸', region: 'Americas', popular: true, majorCities: ['New York', 'San Francisco', 'Austin', 'Seattle', 'Chicago', 'Atlanta', 'Boston', 'Los Angeles', 'Dallas'] },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', region: 'Americas', popular: true, majorCities: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa', 'Calgary'] },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', region: 'Americas', majorCities: ['Mexico City', 'Guadalajara', 'Monterrey'] },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', region: 'Americas', popular: true, majorCities: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte'] },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', region: 'Americas', majorCities: ['Buenos Aires', 'Córdoba', 'Rosario'] },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', region: 'Americas', majorCities: ['Santiago', 'Valparaíso'] },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', region: 'Americas', majorCities: ['Bogotá', 'Medellín', 'Cali'] },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', region: 'Americas', majorCities: ['Lima', 'Arequipa'] },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷', region: 'Americas', majorCities: ['San José'] },
  { code: 'PA', name: 'Panama', flag: '🇵🇦', region: 'Americas', majorCities: ['Panama City'] },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾', region: 'Americas', majorCities: ['Montevideo'] },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲', region: 'Americas', majorCities: ['Kingston', 'Montego Bay'] },
  { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹', region: 'Americas', majorCities: ['Port of Spain'] },
  { code: 'BS', name: 'Bahamas', flag: '🇧🇸', region: 'Americas', majorCities: ['Nassau'] },
  { code: 'BB', name: 'Barbados', flag: '🇧🇧', region: 'Americas', majorCities: ['Bridgetown'] },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴', region: 'Americas', majorCities: ['Santo Domingo'] },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨', region: 'Americas', majorCities: ['Quito', 'Guayaquil'] },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹', region: 'Americas', majorCities: ['Guatemala City'] },

  // --- Europe ---
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', region: 'Europe', popular: true, majorCities: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Bristol', 'Cambridge', 'Leeds'] },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', region: 'Europe', popular: true, majorCities: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne'] },
  { code: 'FR', name: 'France', flag: '🇫🇷', region: 'Europe', popular: true, majorCities: ['Paris', 'Lyon', 'Marseille', 'Toulouse'] },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', region: 'Europe', popular: true, majorCities: ['Amsterdam', 'Rotterdam', 'Utrecht', 'The Hague'] },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', region: 'Europe', popular: true, majorCities: ['Dublin', 'Cork', 'Galway'] },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', region: 'Europe', popular: true, majorCities: ['Zurich', 'Geneva', 'Basel', 'Bern'] },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', region: 'Europe', majorCities: ['Stockholm', 'Gothenburg', 'Malmö'] },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', region: 'Europe', majorCities: ['Madrid', 'Barcelona', 'Valencia', 'Seville'] },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', region: 'Europe', majorCities: ['Milan', 'Rome', 'Turin', 'Florence'] },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', region: 'Europe', majorCities: ['Warsaw', 'Kraków', 'Wrocław'] },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', region: 'Europe', majorCities: ['Brussels', 'Antwerp', 'Ghent'] },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', region: 'Europe', majorCities: ['Vienna', 'Salzburg', 'Graz'] },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', region: 'Europe', majorCities: ['Copenhagen', 'Aarhus'] },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', region: 'Europe', majorCities: ['Helsinki', 'Espoo', 'Tampere'] },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', region: 'Europe', majorCities: ['Oslo', 'Bergen', 'Trondheim'] },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', region: 'Europe', majorCities: ['Lisbon', 'Porto', 'Braga'] },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', region: 'Europe', majorCities: ['Prague', 'Brno'] },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', region: 'Europe', majorCities: ['Bucharest', 'Cluj-Napoca'] },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', region: 'Europe', majorCities: ['Budapest'] },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', region: 'Europe', majorCities: ['Athens', 'Thessaloniki'] },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', region: 'Europe', majorCities: ['Luxembourg City'] },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪', region: 'Europe', majorCities: ['Tallinn', 'Tartu'] },

  // --- Middle East ---
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', region: 'Middle East', popular: true, majorCities: ['Dubai', 'Abu Dhabi', 'Sharjah'] },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', region: 'Middle East', popular: true, majorCities: ['Riyadh', 'Jeddah', 'Dammam'] },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', region: 'Middle East', majorCities: ['Doha', 'Al Wakrah'] },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭', region: 'Middle East', majorCities: ['Manama'] },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼', region: 'Middle East', majorCities: ['Kuwait City'] },
  { code: 'OM', name: 'Oman', flag: '🇴🇲', region: 'Middle East', majorCities: ['Muscat'] },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', region: 'Middle East', majorCities: ['Istanbul', 'Ankara', 'Izmir'] },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', region: 'Middle East', majorCities: ['Tel Aviv', 'Jerusalem', 'Haifa'] },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴', region: 'Middle East', majorCities: ['Amman'] },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧', region: 'Middle East', majorCities: ['Beirut'] },

  // --- Asia ---
  { code: 'IN', name: 'India', flag: '🇮🇳', region: 'Asia', popular: true, majorCities: ['Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune'] },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', region: 'Asia', popular: true, majorCities: ['Singapore'] },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', region: 'Asia', popular: true, majorCities: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama'] },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', region: 'Asia', majorCities: ['Seoul', 'Busan', 'Incheon'] },
  { code: 'CN', name: 'China', flag: '🇨🇳', region: 'Asia', majorCities: ['Beijing', 'Shanghai', 'Shenzhen', 'Guangzhou'] },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', region: 'Asia', majorCities: ['Hong Kong'] },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', region: 'Asia', majorCities: ['Kuala Lumpur', 'Penang'] },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', region: 'Asia', majorCities: ['Jakarta', 'Bali', 'Surabaya'] },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', region: 'Asia', majorCities: ['Manila', 'Cebu'] },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', region: 'Asia', majorCities: ['Ho Chi Minh City', 'Hanoi'] },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', region: 'Asia', majorCities: ['Bangkok', 'Chiang Mai'] },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', region: 'Asia', majorCities: ['Karachi', 'Lahore', 'Islamabad'] },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', region: 'Asia', majorCities: ['Dhaka', 'Chittagong'] },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', region: 'Asia', majorCities: ['Colombo'] },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', region: 'Asia', majorCities: ['Taipei', 'Hsinchu'] },

  // --- Oceania ---
  { code: 'AU', name: 'Australia', flag: '🇦🇺', region: 'Oceania', popular: true, majorCities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'] },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', region: 'Oceania', majorCities: ['Auckland', 'Wellington', 'Christchurch'] },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯', region: 'Oceania', majorCities: ['Suva'] },

  // --- Additional Countries Worldwide (Alphabetical) ---
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫', region: 'Asia' },
  { code: 'AL', name: 'Albania', flag: '🇦🇱', region: 'Europe' },
  { code: 'AD', name: 'Andorra', flag: '🇦🇩', region: 'Europe' },
  { code: 'AG', name: 'Antigua and Barbuda', flag: '🇦🇬', region: 'Americas' },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲', region: 'Asia' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿', region: 'Asia' },
  { code: 'BY', name: 'Belarus', flag: '🇧🇾', region: 'Europe' },
  { code: 'BZ', name: 'Belize', flag: '🇧🇿', region: 'Americas' },
  { code: 'BT', name: 'Bhutan', flag: '🇧🇹', region: 'Asia' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴', region: 'Americas' },
  { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦', region: 'Europe' },
  { code: 'BN', name: 'Brunei', flag: '🇧🇳', region: 'Asia' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', region: 'Europe' },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭', region: 'Asia' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷', region: 'Europe' },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺', region: 'Americas' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾', region: 'Europe' },
  { code: 'DM', name: 'Dominica', flag: '🇩🇲', region: 'Americas' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻', region: 'Americas' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪', region: 'Asia' },
  { code: 'GD', name: 'Grenada', flag: '🇬🇩', region: 'Americas' },
  { code: 'GY', name: 'Guyana', flag: '🇬🇾', region: 'Americas' },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹', region: 'Americas' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳', region: 'Americas' },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸', region: 'Europe' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶', region: 'Middle East' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', region: 'Asia' },
  { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬', region: 'Asia' },
  { code: 'LA', name: 'Laos', flag: '🇱🇦', region: 'Asia' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻', region: 'Europe' },
  { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮', region: 'Europe' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹', region: 'Europe' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻', region: 'Asia' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹', region: 'Europe' },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩', region: 'Europe' },
  { code: 'MC', name: 'Monaco', flag: '🇲🇨', region: 'Europe' },
  { code: 'MN', name: 'Mongolia', flag: '🇲🇳', region: 'Asia' },
  { code: 'ME', name: 'Montenegro', flag: '🇲🇪', region: 'Europe' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲', region: 'Asia' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', region: 'Asia' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮', region: 'Americas' },
  { code: 'MK', name: 'North Macedonia', flag: '🇲🇰', region: 'Europe' },
  { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬', region: 'Oceania' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾', region: 'Americas' },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸', region: 'Europe' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰', region: 'Europe' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮', region: 'Europe' },
  { code: 'SR', name: 'Suriname', flag: '🇸🇷', region: 'Americas' },
  { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯', region: 'Asia' },
  { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲', region: 'Asia' },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿', region: 'Asia' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪', region: 'Americas' },
  { code: 'YE', name: 'Yemen', flag: '🇾🇪', region: 'Middle East' }
];

// Sort unique countries alphabetically for easy lookup
export const ALL_COUNTRIES_SORTED = [...WORLD_COUNTRIES].sort((a, b) => a.name.localeCompare(b.name));

// Get popular / featured countries
export const POPULAR_COUNTRIES = WORLD_COUNTRIES.filter(c => c.popular);

// African countries
export const AFRICAN_COUNTRIES = WORLD_COUNTRIES.filter(c => c.region === 'Africa');

/**
 * Finds country metadata by name, code, or city
 */
export function findCountry(query: string): CountryItem | undefined {
  if (!query) return undefined;
  const q = query.toLowerCase().trim();
  return WORLD_COUNTRIES.find(
    c =>
      c.name.toLowerCase() === q ||
      c.code.toLowerCase() === q ||
      c.majorCities?.some(city => city.toLowerCase() === q)
  );
}

/**
 * Smart matcher for job location against selected country or custom search string
 */
export function matchJobLocation(jobLocation: string, selectedLocation: string): boolean {
  if (!selectedLocation || selectedLocation === 'All' || selectedLocation.trim() === '') {
    return true;
  }

  const query = selectedLocation.trim().toLowerCase();
  const jobLoc = jobLocation.toLowerCase();

  // Special case: Remote
  if (query === 'remote') {
    return jobLoc.includes('remote') || jobLoc.includes('anywhere') || jobLoc.includes('global');
  }

  // Special case: Pan-Africa
  if (query === 'pan-africa' || query === 'pan-african' || query === 'africa') {
    if (jobLoc.includes('africa') || jobLoc.includes('pan-africa')) return true;
    return AFRICAN_COUNTRIES.some(ac => 
      jobLoc.includes(ac.name.toLowerCase()) || 
      ac.majorCities?.some(city => jobLoc.includes(city.toLowerCase()))
    );
  }

  // Direct substring match
  if (jobLoc.includes(query)) {
    return true;
  }

  // Check if selected location is a known country
  const country = WORLD_COUNTRIES.find(c => c.name.toLowerCase() === query || c.code.toLowerCase() === query);
  if (country) {
    // Check country name
    if (jobLoc.includes(country.name.toLowerCase())) return true;
    
    // Check country code with word boundary (e.g. "US", "UK", "NG")
    const codeRegex = new RegExp(`\\b${country.code.toLowerCase()}\\b`, 'i');
    if (codeRegex.test(jobLoc)) return true;

    // Check country's major cities
    if (country.majorCities?.some(city => jobLoc.includes(city.toLowerCase()))) {
      return true;
    }

    // Special matching for USA / UK / UAE aliases
    if (country.code === 'US' && (jobLoc.includes('usa') || jobLoc.includes('united states') || jobLoc.includes('america'))) return true;
    if (country.code === 'GB' && (jobLoc.includes('uk') || jobLoc.includes('united kingdom') || jobLoc.includes('britain') || jobLoc.includes('england'))) return true;
    if (country.code === 'AE' && (jobLoc.includes('uae') || jobLoc.includes('emirates') || jobLoc.includes('dubai'))) return true;
    if (country.code === 'ZA' && (jobLoc.includes('south africa') || jobLoc.includes('sa'))) return true;
  }

  // If the job is Global Remote, it can match international inquiries
  if (jobLoc.includes('global') || jobLoc.includes('worldwide') || jobLoc.includes('remote (africa / global)')) {
    return true;
  }

  return false;
}
