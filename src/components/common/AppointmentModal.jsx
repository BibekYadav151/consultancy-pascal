import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaUser, FaTimes, FaCheck, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { appointmentsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const AppointmentModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferred_country: '',
    message: ''
  });

  const appointmentTypes = [
    { id: 'study_abroad', title: 'Study Abroad Counseling', icon: '🌍', desc: 'Get guidance on studying overseas' },
    { id: 'course_selection', title: 'Course Selection', icon: '📚', desc: 'Find the right course for you' },
    { id: 'visa_guidance', title: 'Visa Guidance', icon: '✈️', desc: 'Expert visa application support' },
    { id: 'test_preparation', title: 'Test Preparation', icon: '📝', desc: 'IELTS, PTE, and language test prep' }
  ];

  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

  const getDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = date.getDate();
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      const dateStr = date.toISOString().split('T')[0];
      dates.push({ dayName, dayNum, monthName, dateStr });
    }
    return dates;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await appointmentsAPI.create({
        student_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        appointment_type: selectedType,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        preferred_country: formData.preferred_country,
        message: formData.message
      });
      setSuccess(true);
      toast.success('Appointment booked successfully!');
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedType('');
    setSelectedDate('');
    setSelectedTime('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      preferred_country: '',
      message: ''
    });
    setSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <FaTimes className="text-gray-600" />
          </button>

          {/* Success State */}
          {success ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="text-4xl text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Appointment Confirmed!</h3>
              <div className="bg-gray-50 rounded-2xl p-6 mb-6 text-left">
                <h4 className="font-semibold text-gray-900 mb-3">Appointment Summary</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Type:</strong> {appointmentTypes.find(t => t.id === selectedType)?.title}</p>
                  <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">We've sent a confirmation email to {formData.email}</p>
              <button
                onClick={handleClose}
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Progress Indicator */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-6">
                <h2 className="text-2xl font-bold text-white mb-4">Book Your Appointment</h2>
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((step) => (
                    <React.Fragment key={step}>
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all ${
                          step <= currentStep
                            ? 'bg-white text-blue-600'
                            : 'bg-white/20 text-white'
                        }`}
                      >
                        {step < currentStep ? <FaCheck /> : step}
                      </div>
                      {step < 3 && (
                        <div
                          className={`flex-1 h-1 rounded-full transition-all ${
                            step < currentStep ? 'bg-white' : 'bg-white/20'
                          }`}
                        ></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <div className="mt-4 flex justify-between text-sm text-white/80">
                  <span>Type</span>
                  <span>Date & Time</span>
                  <span>Details</span>
                </div>
              </div>

              <div className="p-8">
                {/* Step 1: Appointment Type */}
                {currentStep === 1 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Select Appointment Type</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {appointmentTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={`p-6 rounded-2xl border-2 text-left transition-all ${
                            selectedType === type.id
                              ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="text-3xl mb-3">{type.icon}</div>
                          <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                          <p className="text-sm text-gray-600">{type.desc}</p>
                          {selectedType === type.id && (
                            <div className="absolute top-2 right-2">
                              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <FaCheck className="text-white text-xs" />
                              </div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {currentStep === 2 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Select Date & Time</h3>
                    
                    {/* Date Selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        <FaCalendarAlt className="inline mr-2" />
                        Choose Date
                      </label>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {getDates().map((date) => (
                          <button
                            key={date.dateStr}
                            onClick={() => setSelectedDate(date.dateStr)}
                            className={`p-3 rounded-xl text-center transition-all ${
                              selectedDate === date.dateStr
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                          >
                            <div className="text-xs font-medium">{date.dayName}</div>
                            <div className="text-lg font-bold">{date.dayNum}</div>
                            <div className="text-xs">{date.monthName}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection */}
                    {selectedDate && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          <FaClock className="inline mr-2" />
                          Choose Time
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`px-4 py-3 rounded-xl font-medium transition-all ${
                                selectedTime === time
                                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Student Details */}
                {currentStep === 3 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      <FaUser className="inline mr-2" />
                      Your Details
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            placeholder="+977 98XXXXXXXX"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Preferred Country (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.preferred_country}
                          onChange={(e) => setFormData({ ...formData, preferred_country: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                          placeholder="e.g., USA, UK, Australia"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Message (Optional)
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows="3"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                          placeholder="Any specific questions or requirements?"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Booking...' : 'Confirm Appointment'}
                      </button>
                    </form>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={currentStep === 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                      currentStep === 1
                        ? 'opacity-50 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <FaArrowLeft />
                    Previous
                  </button>
                  {currentStep < 3 ? (
                    <button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={
                        (currentStep === 1 && !selectedType) ||
                        (currentStep === 2 && (!selectedDate || !selectedTime))
                      }
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      Next
                      <FaArrowRight />
                    </button>
                  ) : null}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
