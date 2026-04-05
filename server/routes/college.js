import { Router } from 'express'
import College from '../models/College.js'
import CollegeRankingApplication from '../models/CollegeRankingApplication.js'
import CollegeRating from '../models/CollegeRating.js'
import CollegeRatingSetting from '../models/CollegeRatingSetting.js'

const router = Router()

const FALLBACK_COLLEGE_LIST = [
  'Indian Institute of Technology Delhi',
  'Indian Institute of Technology Bombay',
  'Indian Institute of Technology Madras',
  'Indian Institute of Technology Kanpur',
  'Indian Institute of Technology Kharagpur',
  'Indian Institute of Science Bangalore',
  'National Institute of Technology Trichy',
  'National Institute of Technology Warangal',
  'National Institute of Technology Surathkal',
  'Delhi Technological University',
  'Netaji Subhas University of Technology - Main Campus (Dwarka)',
  'Netaji Subhas University of Technology - East Campus (Geeta Colony)',
  'Netaji Subhas University of Technology - West Campus (Jaffarpur)',
  'Jadavpur University',
  'Vellore Institute of Technology - Vellore Campus',
  'Vellore Institute of Technology - Chennai Campus',
  'VIT-AP University Amaravati',
  'VIT Bhopal University',
  'SRM Institute of Science and Technology - Kattankulathur (Main Campus)',
  'SRM Institute of Science and Technology - Ramapuram Campus',
  'SRM Institute of Science and Technology - Vadapalani Campus',
  'SRM Institute of Science and Technology - NCR Campus (Ghaziabad)',
  'SRM University AP Amaravati',
  'SRM University Delhi-NCR Sonepat',
  'SRM University Sikkim',
  'Lovely Professional University',
  'Amity University Noida',
  'Amity University Lucknow',
  'Amity University Jaipur',
  'Amity University Gurugram',
  'Amity University Gwalior',
  'Amity University Mumbai',
  'Amity University Raipur',
  'Amity University Kolkata',
  'Amity University Ranchi',
  'Amity University Patna',
  'Amity University Mohali',
  'Manipal Institute of Technology (MAHE) - Manipal',
  'Manipal University Jaipur (MUJ)',
  'Sikkim Manipal Institute of Technology (SMIT) - Sikkim',
  'Manipal Institute of Technology - Bengaluru',
  'Birla Institute of Technology and Science - Pilani Campus',
  'Birla Institute of Technology and Science - Goa Campus',
  'Birla Institute of Technology and Science - Hyderabad Campus',
  'Birla Institute of Technology and Science - Dubai Campus',
  'Pune Institute of Computer Technology',
  'College of Engineering Pune',
  'Indian Institute of Technology Roorkee',
  'Indian Institute of Technology Guwahati',
  'Indian Institute of Technology Hyderabad',
  'Indian Institute of Technology Indore',
  'Indian Institute of Technology (BHU) Varanasi',
  'Indian Institute of Technology Jodhpur',
  'Indian Institute of Technology Patna',
  'Indian Institute of Technology Bhubaneswar',
  'Indian Institute of Technology Ropar',
  'Indian Institute of Technology Mandi',
  'Indian Institute of Technology Gandhinagar',
  'Indian Institute of Technology Palakkad',
  'Indian Institute of Technology Tirupati',
  'Indian Institute of Technology (ISM) Dhanbad',
  'Indian Institute of Technology Bhilai',
  'Indian Institute of Technology Goa',
  'Indian Institute of Technology Jammu',
  'Indian Institute of Technology Dharwad',
  'National Institute of Technology Calicut',
  'National Institute of Technology Rourkela',
  'Motilal Nehru National Institute of Technology Allahabad',
  'Malaviya National Institute of Technology Jaipur',
  'National Institute of Technology Kurukshetra',
  'National Institute of Technology Silchar',
  'National Institute of Technology Durgapur',
  'National Institute of Technology Hamirpur',
  'Dr. B. R. Ambedkar National Institute of Technology Jalandhar',
  'National Institute of Technology Meghalaya',
  'National Institute of Technology Raipur',
  'National Institute of Technology Srinagar',
  'National Institute of Technology Patna',
  'Maulana Azad National Institute of Technology Bhopal',
  'National Institute of Technology Agartala',
  'National Institute of Technology Goa',
  'National Institute of Technology Jamshedpur',
  'National Institute of Technology Manipur',
  'National Institute of Technology Mizoram',
  'National Institute of Technology Nagaland',
  'National Institute of Technology Sikkim',
  'National Institute of Technology Uttarakhand',
  'National Institute of Technology Andhra Pradesh',
  'National Institute of Technology Delhi',
  'National Institute of Technology Puducherry',
  'International Institute of Information Technology Hyderabad',
  'International Institute of Information Technology Bangalore',
  'International Institute of Information Technology Naya Raipur',
  'International Institute of Information Technology Bhubaneswar',
  'International Institute of Information Technology Pune',
  'Indian Institute of Information Technology Allahabad',
  'Indraprastha Institute of Information Technology Delhi',
  'Atal Bihari Vajpayee Indian Institute of Information Technology and Management Gwalior',
  'Pandit Deendayal Energy University',
  'Indian Institute of Information Technology Design and Manufacturing Kancheepuram',
  'Indian Institute of Information Technology Design and Manufacturing Jabalpur',
  'Indian Institute of Information Technology Design and Manufacturing Kurnool',
  'Indian Institute of Information Technology Pune',
  'Indian Institute of Information Technology Guwahati',
  'Indian Institute of Information Technology Vadodara',
  'Indian Institute of Information Technology Kota',
  'Indian Institute of Information Technology Sri City',
  'Indian Institute of Information Technology Trichy',
  'Indian Institute of Information Technology Kalyani',
  'Indian Institute of Information Technology Lucknow',
  'Indian Institute of Information Technology Dharwad',
  'Indian Institute of Information Technology Kottayam',
  'Indian Institute of Information Technology Manipur',
  'Indian Institute of Information Technology Nagpur',
  'Indian Institute of Information Technology Ranchi',
  'Indian Institute of Information Technology Surat',
  'Indian Institute of Information Technology Bhopal',
  'Indian Institute of Information Technology Bhagalpur',
  'Indian Institute of Information Technology Agartala',
  'Indian Institute of Information Technology Raichur',
  'Indian Institute of Information Technology Una',
  'Indian Institute of Information Technology Sonepat',
  'Indian Institute of Information Technology Vadodara - International Campus Diu',
  'Indian Institute of Engineering Science and Technology Shibpur',
  'Birla Institute of Technology - Mesra',
  'Birla Institute of Technology - Patna Campus',
  'Birla Institute of Technology - Deoghar Campus',
  'Birla Institute of Technology - Jaipur Campus',
  'Birla Institute of Technology - Noida Campus',
  'Thapar Institute of Engineering and Technology',
  'Kalinga Institute of Industrial Technology',
  'Symbiosis Institute of Technology - Pune',
  'Symbiosis Institute of Technology - Nagpur',
  'Symbiosis International University - Noida Campus',
  'Symbiosis International University - Hyderabad Campus',
  'Symbiosis International University - Bengaluru Campus',
  'Symbiosis International University - Nashik Campus',
  'Nirma University',
  'Jaypee Institute of Information Technology - Noida Sec 62',
  'Jaypee Institute of Information Technology - Noida Sec 128',
  'Jaypee University of Information Technology - Waknaghat',
  'Jaypee University of Engineering and Technology - Guna',
  'Shiv Nadar University',
  'Ashoka University',
  'O. P. Jindal Global University',
  'Anna University - College of Engineering Guindy (CEG)',
  'Anna University - Madras Institute of Technology (MIT)',
  'Anna University - Alagappa College of Technology (ACT)',
  'Anna University - School of Architecture and Planning (SAP)',
  'Panjab University',
  'Osmania University - University College of Engineering',
  'Jawaharlal Nehru Technological University - Hyderabad',
  'Jawaharlal Nehru Technological University - Kakinada',
  'Jawaharlal Nehru Technological University - Anantapur',
  'Jawaharlal Nehru Technological University - Vizianagaram',
  'University of Mumbai',
  'Savitribai Phule Pune University',
  'University of Calcutta',
  'University of Delhi',
  'Jawaharlal Nehru University',
  'Jamia Millia Islamia',
  'Aligarh Muslim University',
  'Banaras Hindu University',
  'Veermata Jijabai Technological Institute',
  'Sardar Patel Institute of Technology',
  'Sardar Patel College of Engineering',
  'Dwarkadas J. Sanghvi College of Engineering',
  'K. J. Somaiya College of Engineering',
  'Thadomal Shahani Engineering College',
  'Vivekanand Education Society Institute of Technology',
  'Fr. C. Rodrigues Institute of Technology (Vashi)',
  'Vidyalankar Institute of Technology',
  'MIT World Peace University - Pune',
  'MIT Academy of Engineering - Alandi',
  'Walchand College of Engineering',
  'Shri Ramdeobaba College of Engineering and Management',
  'Vishwakarma Institute of Technology',
  'R. V. College of Engineering',
  'B. M. S. College of Engineering',
  'M. S. Ramaiah Institute of Technology',
  'PES University - Ring Road Campus',
  'PES University - Electronic City Campus',
  'Nitte Meenakshi Institute of Technology',
  'Dayananda Sagar College of Engineering',
  'Dayananda Sagar University',
  'Bangalore Institute of Technology',
  'The National Institute of Engineering (NIE) - Mysore',
  'Sri Jayachamarajendra College of Engineering (SJCE) - Mysore',
  'Reva University',
  'Presidency University - Bangalore',
  'Christ University - Central Campus Bangalore',
  'Christ University - Bannerghatta Campus Bangalore',
  'Christ University - Kengeri Campus Bangalore',
  'Christ University - Yeshwanthpur Campus Bangalore',
  'Christ University - Delhi NCR Campus Ghaziabad',
  'Christ University - Pune Lavasa Campus',
  'Narsee Monjee Institute of Management Studies (NMIMS) - Mumbai',
  'Narsee Monjee Institute of Management Studies (NMIMS) - Shirpur',
  'Narsee Monjee Institute of Management Studies (NMIMS) - Bengaluru',
  'Narsee Monjee Institute of Management Studies (NMIMS) - Hyderabad',
  'Narsee Monjee Institute of Management Studies (NMIMS) - Indore',
  'Narsee Monjee Institute of Management Studies (NMIMS) - Navi Mumbai',
  'Narsee Monjee Institute of Management Studies (NMIMS) - Chandigarh',
  'PSG College of Technology',
  'Coimbatore Institute of Technology (CIT)',
  'SSN College of Engineering',
  'SASTRA Deemed University - Thanjavur Main Campus',
  'SASTRA Deemed University - Kumbakonam Campus',
  'Sathyabama Institute of Science and Technology',
  'Hindustan Institute of Technology and Science',
  'Karunya Institute of Technology and Sciences',
  'B.S. Abdur Rahman Crescent Institute of Science and Technology',
  'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
  'Harcourt Butler Technical University',
  'Madan Mohan Malaviya University of Technology',
  'Institute of Engineering and Technology (IET) - Lucknow',
  'Kamla Nehru Institute of Technology (KNIT) - Sultanpur',
  'Bundelkhand Institute of Engineering and Technology (BIET) - Jhansi',
  'JSS Academy of Technical Education - Noida',
  'Ajay Kumar Garg Engineering College (AKGEC)',
  'KIET Group of Institutions',
  'ABES Engineering College',
  'Galgotias College of Engineering and Technology',
  'GL Bajaj Institute of Technology and Management',
  'Punjab Engineering College Chandigarh',
  'Institute of Engineering and Management (IEM) Kolkata',
  'Heritage Institute of Technology',
  'Haldia Institute of Technology',
  'Techno Main Salt Lake',
  'Techno International New Town',
  'Techno International Batanagar',
  'Kalyani Government Engineering College',
  'Jalpaiguri Government Engineering College',
  'Netaji Subhash Engineering College',
  'RCC Institute of Information Technology',
  'Meghnad Saha Institute of Technology',
  'Dhirubhai Ambani Institute of Information and Communication Technology',
  'Ahmedabad University',
  'L. D. College of Engineering',
  'Vishwakarma Government Engineering College',
  'Birla Vishvakarma Mahavidyalaya',
  'G H Patel College of Engineering and Technology (GCET)',
  'VNR Vignana Jyothi Institute of Engineering and Technology',
  'Chaitanya Bharathi Institute of Technology',
  'Vasavi College of Engineering',
  'Gokaraju Rangaraju Institute of Engineering and Technology',
  'Anurag University',
  'Sreenidhi Institute of Science and Technology',
  'Muffakham Jah College of Engineering and Technology',
  'Kakatiya Institute of Technology and Science',
  'Mahatma Gandhi Institute of Technology',
  'Keshav Memorial Institute of Technology',
  'G Narayanamma Institute of Technology and Science',
  'BVRIT Hyderabad College of Engineering for Women',
  'Padmasri Dr B.V. Raju Institute of Technology (BVRIT Narsapur)',
  'Vardhaman College of Engineering',
  'CVR College of Engineering',
  'Indian Institute of Science Education and Research Pune',
  'Indian Institute of Science Education and Research Kolkata',
  'Indian Institute of Science Education and Research Mohali',
  'Indian Institute of Science Education and Research Bhopal',
  'Indian Institute of Science Education and Research Thiruvananthapuram',
  'Indian Institute of Science Education and Research Tirupati',
  'Indian Institute of Science Education and Research Berhampur',
  'National Institute of Science Education and Research Bhubaneswar',
  'School of Planning and Architecture Delhi',
  'School of Planning and Architecture Bhopal',
  'School of Planning and Architecture Vijayawada',
  'Guru Gobind Singh Indraprastha University - Main Campus',
  'Maharaja Agrasen Institute of Technology',
  'Maharaja Surajmal Institute of Technology',
  'Bhagwan Parshuram Institute of Technology',
  'Delhi Skill and Entrepreneurship University (DSEU) - Okhla Campus',
  'Delhi Skill and Entrepreneurship University (DSEU) - Pitampura Campus',
  'Delhi Skill and Entrepreneurship University (DSEU) - Rohini Campus',
  'Delhi Skill and Entrepreneurship University (DSEU) - Dwarka Campus',
  'Bharati Vidyapeeth Deemed University - Pune',
  'Bharati Vidyapeeth College of Engineering - Delhi',
  'Amrita Vishwa Vidyapeetham - Coimbatore',
  'Amrita Vishwa Vidyapeetham - Amritapuri',
  'Amrita Vishwa Vidyapeetham - Bengaluru',
  'Amrita Vishwa Vidyapeetham - Chennai',
  'Amrita Vishwa Vidyapeetham - Amaravati',
  'Cochin University of Science and Technology',
  'Maharaja Sayajirao University of Baroda',
  'Gujarat Technological University',
  'Visvesvaraya Technological University',
  'APJ Abdul Kalam Technological University',
  'Dr. A.P.J. Abdul Kalam Technical University',
  'Rajiv Gandhi Proudyogiki Vishwavidyalaya',
  'Biju Patnaik University of Technology',
  'Rajasthan Technical University',
  'Kurukshetra University',
  'Maharshi Dayanand University',
  'Guru Nanak Dev University',
  'Tezpur University',
  'North Eastern Hill University',
  'Assam University',
  'Mizoram University',
  'Pondicherry University',
  'Goa University',
  'University of Hyderabad',
  'English and Foreign Languages University',
  'Tata Institute of Social Sciences - Mumbai',
  'Tata Institute of Social Sciences - Tuljapur',
  'Tata Institute of Social Sciences - Guwahati',
  'Tata Institute of Social Sciences - Hyderabad',
  'Indian Statistical Institute Kolkata',
  'Indian Statistical Institute Delhi',
  'Indian Statistical Institute Bangalore',
  'Indian Statistical Institute Tezpur',
  'Indian Statistical Institute Chennai',
  'Chennai Mathematical Institute',
  'National Institute of Design Ahmedabad',
  'National Institute of Design Gandhinagar',
  'National Institute of Design Bengaluru',
  'National Institute of Design Vijayawada',
  'National Institute of Design Kurukshetra',
  'National Institute of Design Bhopal',
  'National Institute of Design Jorhat',
  'National Institute of Fashion Technology Delhi',
  'National Institute of Fashion Technology Mumbai',
  'National Institute of Fashion Technology Kolkata',
  'National Institute of Fashion Technology Gandhinagar',
  'National Institute of Fashion Technology Hyderabad',
  'National Institute of Fashion Technology Chennai',
  'National Institute of Fashion Technology Bangalore',
  'National Institute of Fashion Technology Raebareli',
  'National Institute of Fashion Technology Shillong',
  'National Institute of Fashion Technology Patna',
  'National Institute of Fashion Technology Kangra',
  'National Institute of Fashion Technology Bhopal',
  'National Institute of Fashion Technology Kannur',
  'National Institute of Fashion Technology Bhubaneswar',
  'National Institute of Fashion Technology Jodhpur',
  'National Institute of Fashion Technology Srinagar',
  'National Institute of Fashion Technology Panchkula',
  'National Institute of Fashion Technology Daman',
  'All India Institute of Medical Sciences Delhi',
  'All India Institute of Medical Sciences Bhopal',
  'All India Institute of Medical Sciences Bhubaneswar',
  'All India Institute of Medical Sciences Jodhpur',
  'All India Institute of Medical Sciences Patna',
  'All India Institute of Medical Sciences Raipur',
  'All India Institute of Medical Sciences Rishikesh',
  'All India Institute of Medical Sciences Raebareli',
  'All India Institute of Medical Sciences Mangalagiri',
  'All India Institute of Medical Sciences Nagpur',
  'All India Institute of Medical Sciences Gorakhpur',
  'All India Institute of Medical Sciences Kalyani',
  'All India Institute of Medical Sciences Bathinda',
  'All India Institute of Medical Sciences Guwahati',
  'All India Institute of Medical Sciences Vijaypur',
  'All India Institute of Medical Sciences Bilaspur',
  'All India Institute of Medical Sciences Madurai',
  'All India Institute of Medical Sciences Darbhanga',
  'All India Institute of Medical Sciences Deoghar',
  'All India Institute of Medical Sciences Rajkot',
  'All India Institute of Medical Sciences Bibinagar',
  'Postgraduate Institute of Medical Education and Research Chandigarh',
  'Christian Medical College Vellore',
  'Armed Forces Medical College Pune',
  'Jawaharlal Institute of Postgraduate Medical Education and Research (JIPMER) Puducherry',
  'National Law School of India University (NLSIU) Bangalore',
  'National Academy of Legal Studies and Research (NALSAR) Hyderabad',
  'National Law Institute University (NLIU) Bhopal',
  'The West Bengal National University of Juridical Sciences (WBNUJS) Kolkata',
  'National Law University (NLU) Jodhpur',
  'Hidayatullah National Law University (HNLU) Raipur',
  'Gujarat National Law University (GNLU) Gandhinagar',
  'Dr. Ram Manohar Lohiya National Law University (RMLNLU) Lucknow',
  'Rajiv Gandhi National University of Law (RGNUL) Patiala',
  'Chanakya National Law University (CNLU) Patna',
  'National University of Advanced Legal Studies (NUALS) Kochi',
  'National Law University Odisha (NLUO) Cuttack',
  'National University of Study and Research in Law (NUSRL) Ranchi',
  'National Law University and Judicial Academy (NLUJA) Assam',
  'Damodaram Sanjivayya National Law University (DSNLU) Visakhapatnam',
  'Tamil Nadu National Law University (TNNLU) Tiruchirappalli',
  'Maharashtra National Law University (MNLU) Mumbai',
  'Maharashtra National Law University (MNLU) Nagpur',
  'Maharashtra National Law University (MNLU) Aurangabad',
  'Himachal Pradesh National Law University (HPNLU) Shimla',
  'Dharmashastra National Law University (DNLU) Jabalpur',
  'Dr. B.R. Ambedkar National Law University (DBRANLU) Sonipat',
  'Indian Institute of Management Ahmedabad',
  'Indian Institute of Management Bangalore',
  'Indian Institute of Management Calcutta',
  'Indian Institute of Management Lucknow',
  'Indian Institute of Management Indore',
  'Indian Institute of Management Kozhikode',
  'Indian Institute of Management Shillong',
  'Indian Institute of Management Rohtak',
  'Indian Institute of Management Raipur',
  'Indian Institute of Management Ranchi',
  'Indian Institute of Management Tiruchirappalli',
  'Indian Institute of Management Kashipur',
  'Indian Institute of Management Udaipur',
  'Indian Institute of Management Nagpur',
  'Indian Institute of Management Visakhapatnam',
  'Indian Institute of Management Bodh Gaya',
  'Indian Institute of Management Amritsar',
  'Indian Institute of Management Sirmaur',
  'Indian Institute of Management Sambalpur',
  'Indian Institute of Management Jammu',
  'Indian Institute of Management Mumbai (NITIE)',
  'Xavier Labour Relations Institute (XLRI) Jamshedpur',
  'Xavier Labour Relations Institute (XLRI) Delhi-NCR',
  'Faculty of Management Studies Delhi',
  'S. P. Jain Institute of Management and Research',
  'Management Development Institute Gurgaon',
  'Management Development Institute Murshidabad',
  'Symbiosis Institute of Business Management Pune',
  'Symbiosis Institute of Business Management Bengaluru',
  'Great Lakes Institute of Management Chennai',
  'Great Lakes Institute of Management Gurgaon',
  'Institute of Chemical Technology Mumbai',
  'Institute of Chemical Technology Bhubaneswar (IOC Bhubaneswar)',
  'Institute of Chemical Technology Marathwada Campus (Jalna)',
  'Banasthali Vidyapith',
  'Graphic Era Deemed to be University Dehradun',
  'Graphic Era Hill University Dehradun',
  'Graphic Era Hill University Bhimtal',
  'Graphic Era Hill University Haldwani',
  'KLE Technological University - Hubballi',
  'KLE Technological University - Belagavi',
  'JSS Science and Technology University',
  'NMAM Institute of Technology',
  'Siddaganga Institute of Technology',
  'Government College of Technology Coimbatore',
  'Sri Venkateswara College of Engineering',
  'Rajalakshmi Engineering College',
  'KCG College of Technology',
  'Medicaps University',
  'SGSITS Indore',
  'Jabalpur Engineering College',
  'Bhilai Institute of Technology',
  'Shri Mata Vaishno Devi University',
  'Chandigarh University',
  'Chitkara University - Punjab',
  'Chitkara University - Himachal Pradesh',
  'BML Munjal University',
  'Galgotias University',
  'Sharda University',
  'Bennett University',
  'UPES Dehradun',
  'DIT University',
  'Uttaranchal University',
  'Manav Rachna International Institute of Research and Studies',
  'Manav Rachna University',
  'GD Goenka University',
  'K.R. Mangalam University',
  'Ambedkar University Delhi',
  'Indira Gandhi Delhi Technical University for Women',
  'National Institute of Food Technology Entrepreneurship and Management (NIFTEM) Kundli',
  'National Institute of Food Technology Entrepreneurship and Management (NIFTEM) Thanjavur',
  'Forest Research Institute Dehradun',
  'Gayatri Vidya Parishad College of Engineering',
  'Anil Neerukonda Institute of Technology and Sciences',
  'Sree Vidyanikethan Engineering College',
  'G Pulla Reddy Engineering College',
  'RVR and JC College of Engineering',
  'Bapatla Engineering College',
  'B. P. Poddar Institute of Management and Technology',
  'Gargi Memorial Institute of Technology',
  'Madhav Institute of Technology and Science Gwalior',
  'Zakir Husain College of Engineering and Technology'
]

const normalizeCollegeName = (value = '') => String(value || '').trim().replace(/\s+/g, ' ')
const escapeRegex = (value = '') => String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const formatAverage = (value = 0) => Number(Number(value || 0).toFixed(2))

// Public: Return homepage visibility setting for live ranking snapshot.
router.get('/ratings/settings', async (_req, res) => {
  try {
    const settings = await CollegeRatingSetting.findOne({ singletonKey: 'global' })
    res.json({ showLiveRankingSnapshot: Boolean(settings?.showLiveRankingSnapshot) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Public: Searchable college list for autocomplete inputs.
router.get('/list', async (req, res) => {
  try {
    const search = normalizeCollegeName(req.query.q || '')
    const page = Math.max(1, Number(req.query.page) || 1)
    const limit = Math.min(50, Math.max(5, Number(req.query.limit) || 20))
    const regex = search ? { $regex: escapeRegex(search), $options: 'i' } : null

    const [fromColleges, fromRankingApplications, fromRatings] = await Promise.all([
      College.distinct('collegeName', regex ? { collegeName: regex } : {}),
      CollegeRankingApplication.distinct('collegeName', regex ? { collegeName: regex } : {}),
      CollegeRating.distinct('collegeName', regex ? { collegeName: regex } : {}),
    ])

    const fallbackMatches = FALLBACK_COLLEGE_LIST.filter((name) => {
      if (!search) return true
      return name.toLowerCase().includes(search.toLowerCase())
    })

    const allNames = Array.from(
      new Set(
        [...fromColleges, ...fromRankingApplications, ...fromRatings, ...fallbackMatches]
          .map(normalizeCollegeName)
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b))

    const startIndex = (page - 1) * limit
    const items = allNames.slice(startIndex, startIndex + limit)

    res.json({
      items,
      page,
      limit,
      total: allNames.length,
      hasMore: startIndex + limit < allNames.length,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Public: College applies for ranking ──
router.post('/apply', async (req, res) => {
  try {
    const {
      collegeName, contactPerson, email, phone,
      startupCount, activities, innovationData,
      workshopsConducted, incubationPrograms, successStories,
    } = req.body
    const college = await College.create({
      collegeName, contactPerson, email, phone,
      startupCount: startupCount || 0,
      activities: activities || '',
      innovationData: innovationData || '',
      workshopsConducted: workshopsConducted || 0,
      incubationPrograms: incubationPrograms || '',
      successStories: successStories || '',
    })
    res.status(201).json({ message: 'Application submitted successfully.', college })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Public: Anonymous college ratings ──
router.post('/ratings', async (req, res) => {
  try {
    const normalizedCollegeName = normalizeCollegeName(req.body?.collegeName)
    const numericRating = Number(req.body?.rating)
    const feedback = String(req.body?.feedback || '').trim()

    if (!normalizedCollegeName) {
      return res.status(400).json({ message: 'Please select a college before submitting your rating.' })
    }

    if (!Number.isInteger(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: 'Rating must be an integer between 1 and 5.' })
    }

    if (feedback.length > 1500) {
      return res.status(400).json({ message: 'Feedback cannot exceed 1500 characters.' })
    }

    const savedRating = await CollegeRating.create({
      collegeName: normalizedCollegeName,
      rating: numericRating,
      feedback,
    })

    const [summary] = await CollegeRating.aggregate([
      { $match: { collegeName: normalizedCollegeName } },
      {
        $group: {
          _id: '$collegeName',
          averageRating: { $avg: '$rating' },
          totalRatings: { $sum: 1 },
        },
      },
    ])

    res.status(201).json({
      message: 'Thanks for rating. Your anonymous feedback has been recorded.',
      rating: {
        id: savedRating._id,
        collegeName: savedRating.collegeName,
        rating: savedRating.rating,
        feedback: savedRating.feedback,
        createdAt: savedRating.createdAt,
      },
      collegeSummary: summary
        ? {
            collegeName: summary._id,
            averageRating: formatAverage(summary.averageRating),
            totalRatings: summary.totalRatings,
          }
        : null,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Public: Community college ranking by average rating ──
router.get('/ratings/ranking', async (req, res) => {
  try {
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10))
    const search = normalizeCollegeName(req.query.q || '')
    const match = search
      ? { collegeName: { $regex: escapeRegex(search), $options: 'i' } }
      : null

    const ranking = await CollegeRating.aggregate([
      ...(match ? [{ $match: match }] : []),
      {
        $group: {
          _id: '$collegeName',
          averageRating: { $avg: '$rating' },
          totalRatings: { $sum: 1 },
          lastRatedAt: { $max: '$createdAt' },
        },
      },
      { $sort: { averageRating: -1, totalRatings: -1, _id: 1 } },
      { $limit: limit },
    ])

    res.json(
      ranking.map((item, index) => ({
        rank: index + 1,
        collegeName: item._id,
        averageRating: formatAverage(item.averageRating),
        totalRatings: item.totalRatings,
        lastRatedAt: item.lastRatedAt,
      }))
    )
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ── Public: View published rankings ──
router.get('/rankings', async (_req, res) => {
  try {
    const colleges = await College.find({ status: 'ranked' })
      .select('collegeName ranking score')
      .sort({ ranking: 1 })
    res.json(colleges)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
