import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Award, BookOpen, CheckCircle2, Clock3, Code2, GraduationCap, Laptop, MapPin, Menu, MessageCircle, Monitor, Network, Phone, ShieldCheck, Star, Wrench, X, Languages } from 'lucide-react'

const PHONE = '919523051430'
const DISPLAY_PHONE = '095230 51430'
const ADDRESS = 'In front of Yagya Maidan, +2, Zila School Road, Dumka, Jharkhand 814101'
const courses = [
  ['DCA','Computer Fundamentals','Build a foundation in computer operation, office tools and digital skills.',Monitor],
  ['ADCA','Advanced Computer','Explore computer applications and practical office skills.',Laptop],
  ['TALLY','Accounting','Learn computerised accounting workflows and business accounting tools.',BookOpen],
  ['DATA ENTRY','Office Skills','Develop typing accuracy, data handling and documentation skills.',CheckCircle2],
  ['DCTT','Computer Training','Explore the institute’s DCTT programme. Ask for syllabus and eligibility.',GraduationCap],
  ['PGDCA','Postgraduate Diploma','Learn about the postgraduate diploma-level computer applications programme.',Award],
  ['TYPING','Office Skills','Improve typing speed and accuracy through structured practice.',Clock3],
  ['DTP ADVANCE','Design & Publishing','Learn desktop publishing and document layout skills.',BookOpen],
  ['SOFTWARE','Technical','Explore software concepts and practical computer skills.',Code2],
  ['HARDWARE','Technical','Understand computer components, assembly and hardware fundamentals.',Wrench],
  ['PROGRAMMING','Technical','Start learning programming concepts and problem-solving.',Code2],
  ['NETWORKING','Technical','Learn networking fundamentals, connectivity and network concepts.',Network],
  ['COMPUTER REPAIRING','Technical','Build practical knowledge of diagnosing and repairing computers.',Wrench]
].map(([name,category,desc,Icon])=>({name,category,desc,Icon}))

const text = {
 en: {
  nav:['Home','About','Courses','Why ICT','Contact'], badge:'Admissions enquiry open',
  title:<>Build your skills.<br/><em>Shape your future.</em></>,
  intro:'Learn practical computer skills with ICT Computer Centre, Dumka. Explore courses designed to help you grow with confidence.',
  explore:'Explore courses', enquire:'Enquire for admission', courses:'Courses for your next step',
  coursesIntro:'From computer fundamentals to technical skills, explore the programmes offered at ICT Computer Centre.',
  about:'Practical learning for a digital world', aboutIntro:'ICT Computer Centre is located near Yagya Maidan on Zila School Road, Dumka. Contact the institute to learn about course syllabus, batches, fees and admissions.',
  why:'A learning environment focused on your progress', whyIntro:'Explore your options and speak directly with the institute before enrolling.',
  admission:'Take the first step towards new skills', admissionIntro:'Tell us which course interests you. The institute can share current fees, batch timings and admission details.',
  name:'Your name', mobile:'Mobile number', course:'Interested course', message:'Your question (optional)', send:'Continue on WhatsApp',
  contact:'Visit or contact ICT Computer Centre', address:'Institute address', hours:'Listed hours', hoursValue:'Open · Closes at 7:00 PM (confirm current timings)',
  fee:'Ask for current fees', duration:'Ask for course duration', reviews:'Google rating', language:'हिंदी'
 },
 hi: {
  nav:['होम','हमारे बारे में','कोर्स','ICT क्यों','संपर्क'], badge:'एडमिशन की जानकारी उपलब्ध',
  title:<>कौशल सीखें।<br/><em>अपना भविष्य बनाएं।</em></>,
  intro:'ICT Computer Centre, Dumka के साथ कंप्यूटर की प्रैक्टिकल स्किल्स सीखें। अपने लक्ष्य के अनुसार कोर्स चुनें।',
  explore:'कोर्स देखें', enquire:'एडमिशन के लिए पूछें', courses:'आपके अगले कदम के लिए कोर्स',
  coursesIntro:'बेसिक कंप्यूटर से लेकर टेक्निकल स्किल्स तक, ICT Computer Centre के कोर्स देखें।',
  about:'डिजिटल दुनिया के लिए प्रैक्टिकल शिक्षा', aboutIntro:'ICT Computer Centre, Dumka में यज्ञ मैदान के सामने, जिला स्कूल रोड पर स्थित है। कोर्स, फीस, बैच और एडमिशन की जानकारी के लिए संस्थान से संपर्क करें।',
  why:'आपकी प्रगति पर केंद्रित सीखने का माहौल', whyIntro:'कोर्स चुनें और एडमिशन से पहले सीधे संस्थान से जानकारी लें।',
  admission:'नई स्किल्स सीखने की शुरुआत करें', admissionIntro:'बताएं कि आप कौन-सा कोर्स करना चाहते हैं। संस्थान आपको फीस, बैच टाइमिंग और एडमिशन की जानकारी दे सकता है।',
  name:'आपका नाम', mobile:'मोबाइल नंबर', course:'कोर्स चुनें', message:'आपका सवाल (वैकल्पिक)', send:'WhatsApp पर भेजें',
  contact:'ICT Computer Centre आएं या संपर्क करें', address:'संस्थान का पता', hours:'खुलने का समय', hoursValue:'खुला · शाम 7 बजे बंद (समय की पुष्टि करें)',
  fee:'वर्तमान फीस पूछें', duration:'कोर्स की अवधि पूछें', reviews:'Google रेटिंग', language:'English'
 }
}


const courseDetails = {
'DCA':{level:'Beginner friendly',overview:'A foundation programme covering computer operation and common office applications.',learn:['Computer fundamentals and operating system basics','File and folder management','Word processing and document formatting','Spreadsheets, presentations and internet basics'],suitable:'Beginners, students and anyone seeking essential computer skills.',next:'Ask whether practical assignments and a certificate are included.'},
'ADCA':{level:'Foundation to intermediate',overview:'A broader computer applications programme focused on office and digital productivity skills.',learn:['Computer fundamentals','Advanced word processing and spreadsheets','Presentation and internet applications','Digital documentation and practical projects'],suitable:'Learners who want broader computer application skills.',next:'Request the exact module list, duration and software versions.'},
'TALLY':{level:'Beginner to intermediate',overview:'An introduction to computerised accounting and business bookkeeping.',learn:['Accounting concepts and transactions','Company creation and ledger management','Vouchers, sales and purchase entries','Inventory, GST workflows and reports'],suitable:'Commerce students, aspiring accountants and business staff.',next:'Confirm the software version and whether GST practice is included.'},
'DATA ENTRY':{level:'Beginner friendly',overview:'Build accuracy in entering, organising and checking information on a computer.',learn:['Keyboard and number-pad practice','Typing accuracy and speed techniques','Spreadsheet and form-based data entry','Document handling and data checking'],suitable:'Beginners preparing for clerical, office-assistant or data-entry work.',next:'Ask about typing practice hours and assessment.'},
'DCTT':{level:'Confirm with institute',overview:'A computer training programme listed by the institute. Its exact expansion and curriculum need confirmation.',learn:['Official course modules to be confirmed','Practical sessions to be confirmed','Assessment requirements to be confirmed','Certificate and awarding body to be confirmed'],suitable:'Ask the centre to confirm the intended learner level and entry requirements.',next:'Request the official full form, syllabus, duration and certificate details.'},
'PGDCA':{level:'Diploma-level programme',overview:'A postgraduate diploma-level computer applications programme. Eligibility and curriculum vary by provider.',learn:['Computer application fundamentals','Programming and database concepts','Office and internet applications','Project work and assessment'],suitable:'Confirm graduation or other eligibility requirements before applying.',next:'Ask for the approved syllabus, eligibility, duration and awarding body.'},
'TYPING':{level:'Beginner friendly',overview:'Structured keyboard practice to improve typing fluency, accuracy and confidence.',learn:['Correct finger placement and posture','Touch-typing practice','Speed and accuracy exercises','Timed practice and error reduction'],suitable:'Students and job seekers preparing for computer-based work.',next:'Ask whether English, Hindi or both typing layouts are taught.'},
'DTP ADVANCE':{level:'Beginner to intermediate',overview:'Desktop publishing skills for creating polished print and digital documents.',learn:['Page layout and document composition','Typography and text formatting','Image placement and design principles','Preparing files for print and export'],suitable:'Learners interested in print shops, publishing and document design.',next:'Confirm which design applications and versions are taught.'},
'SOFTWARE':{level:'Depends on module',overview:'A broad software training category. The exact tools and topics should be selected with the institute.',learn:['Software concepts and application use','Installing and managing applications','Practical tasks using selected software','Troubleshooting common software issues'],suitable:'Learners who want to improve their software knowledge.',next:'Get the exact software names, syllabus and project details.'},
'HARDWARE':{level:'Beginner to intermediate',overview:'Understand computer components and the basics of assembling and maintaining a PC.',learn:['Identify internal and external components','CPU, RAM, storage and motherboard basics','PC assembly and peripheral connections','Basic maintenance and fault diagnosis'],suitable:'Beginners interested in computer maintenance and technical support.',next:'Ask how much hands-on lab practice is included.'},
'PROGRAMMING':{level:'Beginner friendly',overview:'An introduction to coding and logical problem-solving.',learn:['Logic building and algorithms','Variables, data types and conditions','Loops, functions and debugging','Small practice programmes'],suitable:'Students and beginners interested in coding.',next:'Confirm which programming language is taught.'},
'NETWORKING':{level:'Beginner to intermediate',overview:'Learn how computers connect and share information across networks.',learn:['Network types and terminology','IP addresses and basic connectivity','Routers, switches and network cables','Basic troubleshooting and security awareness'],suitable:'Learners interested in IT support and networking fundamentals.',next:'Ask about practical router, switch and cable exercises.'},
'COMPUTER REPAIRING':{level:'Beginner to intermediate',overview:'An introductory practical course in diagnosing common computer hardware problems.',learn:['Computer components and safe handling','Assembling and disassembling a desktop PC','Diagnosing common hardware faults','Basic maintenance and OS installation'],suitable:'Beginners interested in computer servicing and repair.',next:'Confirm hands-on practice and whether laptop repair is covered.'}
}

const wa = (message) => 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(message)

export default function App() {
 const [lang,setLang]=useState('en')
 const [menu,setMenu]=useState(false)
 const [selectedCourse,setSelectedCourse]=useState(null)
 const [search,setSearch]=useState('')
 const [form,setForm]=useState({name:'',mobile:'',course:'',message:''})
 const t=text[lang]
 const shown=useMemo(()=>courses.filter(c=>(c.name+' '+c.category).toLowerCase().includes(search.toLowerCase())),[search])
 const scroll=id=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenu(false)}
 const submit=e=>{e.preventDefault();window.open(wa('Hello ICT Computer Centre, Dumka.\nName: '+form.name+'\nMobile: '+form.mobile+'\nCourse: '+form.course+'\nQuestion: '+(form.message||'Please share admission details.')),'_blank','noopener,noreferrer')}

 return <div className="site">
  <div className="top"><span><MapPin size={13}/> Dumka, Jharkhand</span><span><Star size={13} fill="currentColor"/> 4.8/5 Google rating · 108 reviews</span></div>
  <header className="header">
   <a className="brand" href="#home" onClick={e=>{e.preventDefault();scroll('home')}}><span className="brandIcon"><Monitor/></span><span><b>ICT</b><small>COMPUTER CENTRE</small></span></a>
   <nav className={menu?'nav open':'nav'}>{t.nav.map((n,i)=><button key={n} onClick={()=>scroll(['home','about','courses','why','contact'][i])}>{n}</button>)}</nav>
   <div className="actions"><button className="lang" onClick={()=>setLang(lang==='en'?'hi':'en')}><Languages size={15}/>{t.language}</button><button className="navCta" onClick={()=>scroll('admission')}>{t.enquire}<ArrowUpRight size={15}/></button><button className="hamb" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation">{menu?<X/>:<Menu/>}</button></div>
  </header>

  <main>
   <section className="hero" id="home"><div className="heroInner">
    <motion.div className="heroCopy" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
     <span className="pill"><i/> {t.badge}</span><h1>{t.title}</h1><p>{t.intro}</p>
     <div className="heroButtons"><button className="primary" onClick={()=>scroll('courses')}>{t.explore}<ArrowRight size={17}/></button><button className="secondary" onClick={()=>scroll('admission')}><MessageCircle size={17}/>{t.enquire}</button></div>
     <div className="proof"><div className="stars">★★★★★</div><span><b>4.8/5</b><small>{t.reviews} · 108 reviews</small></span></div>
    </motion.div>
    <motion.div className="heroArt" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{duration:.7}}>
     <div className="artGlow"/><div className="screen"><div className="screenBar"><i/><i/><i/><small>ICT LEARNING SPACE</small></div><div className="screenBody"><span>LEARN · PRACTISE · GROW</span><strong>Your skills.<br/><em>Your future.</em></strong><hr/><small><Laptop size={16}/> Practical computer learning</small></div></div>
     <div className="float rating"><Star fill="currentColor"/><span><b>4.8 / 5</b><small>Google rating</small></span></div><div className="float count"><BookOpen/><span><b>13 courses</b><small>Explore your options</small></span></div>
    </motion.div>
   </div><div className="heroFoot"><span>COMPUTER EDUCATION · DUMKA</span><span>SCROLL TO EXPLORE ↓</span></div></section>

   <div className="trust"><span><CheckCircle2/>4.8/5 Google rating</span><span><CheckCircle2/>13 course options</span><span><CheckCircle2/>Direct admission enquiries</span></div>

   <section className="section" id="courses"><div className="sectionHead"><div><label>FIND YOUR LEARNING PATH</label><h2>{t.courses}</h2><p>{t.coursesIntro}</p></div><div className="search"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search courses…"/><small>{shown.length} courses</small></div></div>
    <div className="courseGrid">{shown.map((c,i)=><motion.article className="course" key={c.name} onClick={()=>setSelectedCourse(c)} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setSelectedCourse(c)}}} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.025}}><div className="courseIcon"><c.Icon/></div><small className="category">{c.category}</small><h3>{c.name}</h3><p>{c.desc}</p><div className="courseFacts"><span>{t.duration}</span><span>{t.fee}</span></div><button className="courseDetailsBtn" onClick={e=>{e.stopPropagation();setSelectedCourse(c)}}>View course details <ArrowRight size={15}/></button></motion.article>)}</div>
    {!shown.length&&<p className="empty">No matching courses found.</p>}
   </section>

   <section className="about" id="about"><div className="photoPlaceholder"><div className="photoIcon"><Laptop/></div><b>ICT COMPUTER CENTRE</b><small>Institute photographs to be added</small><div className="stamp"><strong>4.8</strong><span>GOOGLE<br/>RATING</span><i>★★★★★</i></div></div><div className="aboutCopy"><label>ABOUT THE INSTITUTE</label><h2>{t.about}</h2><p>{t.aboutIntro}</p><div className="point"><ShieldCheck/><span><b>Clear course information</b><small>Ask about syllabus, practical sessions and eligibility.</small></span></div><div className="point"><GraduationCap/><span><b>Multiple learning options</b><small>Explore 13 listed computer course offerings.</small></span></div><button className="linkBtn" onClick={()=>scroll('contact')}>Find the institute <ArrowUpRight size={16}/></button></div></section>

   <section className="section why" id="why"><div className="centerHead"><label>WHY LEARN WITH ICT</label><h2>{t.why}</h2><p>{t.whyIntro}</p></div><div className="whyGrid"><article><span>01</span><BookOpen/><h3>Course choices</h3><p>Explore computer, accounting, office and technical learning options.</p></article><article><span>02</span><Monitor/><h3>Practical focus</h3><p>Ask the institute about practical sessions, tools and course syllabus.</p></article><article><span>03</span><MessageCircle/><h3>Direct guidance</h3><p>Contact the centre for current fees, batches and admission guidance.</p></article></div></section>

   <section className="reviews"><div className="reviewHead"><div><label>GOOGLE REVIEWS</label><h2>What learners say</h2><p>The institute has a 4.8-star Google rating from 108 reviews.</p></div><div className="score"><b>4.8</b><span>★★★★★</span><small>108 Google reviews</small><a href="https://www.google.com/maps/search/?api=1&query=ICT+Computer+Centre+Dumka" target="_blank" rel="noreferrer">View on Google <ArrowUpRight size={14}/></a></div></div><div className="quotes"><blockquote>“It offers all the essential facilities needed for quality learning.”</blockquote><blockquote>“The staff are friendly, approachable, and always willing to lend a helping hand.”</blockquote><blockquote>“Amazing place for learning computer with amazing teachers.”</blockquote></div><small className="reviewNote">Review excerpts supplied in the project brief. Verify wording and source before publishing.</small></section>

   <section className="admission" id="admission"><div className="admissionCopy"><label>START YOUR LEARNING JOURNEY</label><h2>{t.admission}</h2><p>{t.admissionIntro}</p><div className="callDirect"><Phone/><span><small>Call the institute</small><b>{DISPLAY_PHONE}</b></span></div></div><form className="form" onSubmit={submit}><h3>Admission enquiry</h3><p>Share your details and continue on WhatsApp.</p><label>{t.name}<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Enter your name"/></label><label>{t.mobile}<input required type="tel" pattern="[0-9+\\s-]{10,15}" value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value})} placeholder="Enter mobile number"/></label><label>{t.course}<select required value={form.course} onChange={e=>setForm({...form,course:e.target.value})}><option value="">Select a course</option>{courses.map(c=><option key={c.name}>{c.name}</option>)}</select></label><label>{t.message}<textarea rows="3" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="What would you like to know?"/></label><button className="primary submit" type="submit">{t.send}<ArrowUpRight size={16}/></button><small className="privacy">Your enquiry opens WhatsApp. This website does not store your information.</small></form></section>

   <section className="section contact" id="contact"><div className="sectionHead"><div><label>GET IN TOUCH</label><h2>{t.contact}</h2></div></div><div className="contactCards"><div><MapPin/><span><small>{t.address}</small><b>{ADDRESS}</b></span></div><a href={'tel:'+PHONE}><Phone/><span><small>Phone</small><b>{DISPLAY_PHONE}</b></span><ArrowUpRight/></a><div><Clock3/><span><small>{t.hours}</small><b>{t.hoursValue}</b></span></div></div><div className="map"><iframe title="ICT Computer Centre map" src="https://www.google.com/maps?q=ICT%20Computer%20Centre%20Dumka%20Jharkhand&output=embed" loading="lazy"/><a href="https://www.google.com/maps/search/?api=1&query=ICT+Computer+Centre+Dumka+Jharkhand" target="_blank" rel="noreferrer">Open directions <ArrowUpRight size={15}/></a></div></section>
  </main>

  {selectedCourse&&<div className="courseOverlay" role="dialog" aria-modal="true" aria-labelledby="courseTitle" onMouseDown={e=>{if(e.target===e.currentTarget)setSelectedCourse(null)}}>
   <section className="courseDetailPanel">
    <button className="detailClose" onClick={()=>setSelectedCourse(null)} aria-label="Close course details"><X/></button>
    <button className="detailBack" onClick={()=>setSelectedCourse(null)}>← Back to all courses</button>
    <div className="detailHero"><span className="detailTag">{selectedCourse.category}</span><h2 id="courseTitle">{selectedCourse.name}</h2><p>{courseDetails[selectedCourse.name].overview}</p><div className="detailMeta"><span><GraduationCap/> {courseDetails[selectedCourse.name].level}</span><span><Clock3/> Duration: confirm with institute</span><span><Award/> Certificate: details on request</span></div></div>
    <div className="detailBody"><div><label>WHAT YOU MAY LEARN</label><h3>Course topics</h3><ul>{courseDetails[selectedCourse.name].learn.map(item=><li key={item}><CheckCircle2/>{item}</li>)}</ul></div><aside><label>IS THIS COURSE FOR YOU?</label><h3>Who can join</h3><p>{courseDetails[selectedCourse.name].suitable}</p><div className="detailNote"><b>Before you enrol</b><p>{courseDetails[selectedCourse.name].next}</p></div><div className="detailFacts"><span>Course fee <b>Contact institute</b></span><span>Duration <b>Contact institute</b></span><span>Batch timing <b>Contact institute</b></span></div><a className="primary detailEnquire" href={wa('Hello ICT Computer Centre, I want complete details for the '+selectedCourse.name+' course, including syllabus, eligibility, duration, fees, batch timings and certificate details.')} target="_blank" rel="noreferrer">Enquire about {selectedCourse.name}<ArrowUpRight/></a></aside></div>
    <p className="detailDisclaimer">Course topics above are an indicative guide, not a confirmed official syllabus. Please verify the exact curriculum, fees, duration, eligibility and certificate/affiliation with ICT Computer Centre before admission.</p>
   </section>
  </div>}

  <footer><div className="footerMain"><a className="brand inverse" href="#home"><span className="brandIcon"><Monitor/></span><span><b>ICT</b><small>COMPUTER CENTRE</small></span></a><p>Computer education and training in Dumka, Jharkhand.</p><a className="footerWa" href={wa('Hello ICT Computer Centre, please share course and admission details.')} target="_blank" rel="noreferrer"><MessageCircle/> WhatsApp us</a></div><div className="footerBottom"><span>© {new Date().getFullYear()} ICT Computer Centre. All rights reserved.</span><span>Dumka, Jharkhand</span></div></footer>
  <a className="floatingWa" href={wa('Hello ICT Computer Centre, I would like to know about admissions.')} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle/></a>
 </div>
}