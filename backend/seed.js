require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/User');
const Organization = require('./models/Organization');
const Request = require('./models/Request');

async function seed() {
  await connectDB(process.env.MONGO_URI);
  await User.deleteMany({});
  await Organization.deleteMany({});
  await Request.deleteMany({});

  const org = new Organization({name:'Shanti Home', type:'ngo', location:{city:'Pune', lat:18.5204, lng:73.8567}, description:'Orphanage in Pune'});
  await org.save();

  const user = new User({name:'Admin NGO', email:'ngo@example.com', password: 'hashme' , role:'ngo', organization:org._id});
  // We'll set a dummy password after hashing:
  const bcrypt = require('bcryptjs'); user.password = await bcrypt.hash('password', 10);
  await user.save();

  const r1 = new Request({title:'Food shortage at Shanti Home', description:'Need cooked meal for 80', category:'food', urgency:'high', org:org._id, orgName:org.name, location:{city:'Pune',lat:18.5204,lng:73.8567}});
  await r1.save();

  console.log('Seeded demo data');
  process.exit(0);
}

seed().catch(e=>{ console.error(e); process.exit(1); });
