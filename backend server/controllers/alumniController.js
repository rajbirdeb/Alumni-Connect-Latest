const User = require('../Models/UserModel');

exports.getAllAlumni = async (req, res) => {
  try {
    const alumni = await User.find({ userType: 'alumni' }).select('-password -registeredEvents -agreeToTerms -__v');
    res.json({ alumni });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch alumni', error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.userType !== 'alumni') return res.status(403).json({ message: 'Only alumni can update' });

    const { batchYear, currentJob, company, bio } = req.body;
    const updateData = { batchYear, currentJob, company, bio };

    if (req.file) updateData.profilePhoto = `/uploads/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, { new: true })
      .select('-password -registeredEvents -agreeToTerms -__v');

    res.json({ message: 'Profile updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update', error: err.message });
  }
};
