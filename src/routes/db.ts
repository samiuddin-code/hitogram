import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://samiuddinbirgoshi@gmail.com:Abcd123!@cluster0.pirsiz7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      // Remove useNewUrlParser and useUnifiedTopology as they are no longer required
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;

