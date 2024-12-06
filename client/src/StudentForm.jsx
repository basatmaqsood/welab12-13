import React, { useState } from 'react';

const StudentForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [subject, setSubject] = useState('');
    const [address, setAddress] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errorsCopy = {};
        let isValid = true;

        if (!firstName.trim()) {
            errorsCopy.firstName = 'First Name is required';
            isValid = false;
        }

        if (!lastName.trim()) {
            errorsCopy.lastName = 'Last Name is required';
            isValid = false;
        }

        if (!age.trim()) {
            errorsCopy.age = 'Age is required';
            isValid = false;
        } else if (isNaN(age) || age < 18 || age > 30) {
            errorsCopy.age = 'Age must be a number between 18 and 30';
            isValid = false;
        }

        if (!subject) {
            errorsCopy.subject = 'Subject selection is required';
            isValid = false;
        }

        if (!address.trim()) {
            errorsCopy.address = 'Address is required';
            isValid = false;
        }

        setErrors(errorsCopy);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const studentData = {
                firstName,
                lastName,
                age,
                subject,
                address,
            };
            console.log('Student Data:', studentData);
            alert('Form Submitted Successfully!');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Student Form</h2>
            <form onSubmit={handleSubmit}>
                {/* First Name */}
                <div className="form-group mb-3">
                    <label className="form-label">First Name:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                </div>

                {/* Last Name */}
                <div className="form-group mb-3">
                    <label className="form-label">Last Name:</label>
                    <input
                        type="text"
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                </div>

                {/* Age */}
                <div className="form-group mb-3">
                    <label className="form-label">Age:</label>
                    <input
                        type="number"
                        className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                </div>

                {/* Subject */}
                <div className="form-group mb-3">
                    <label className="form-label">Subject:</label>
                    <select
                        className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    >
                        <option value="">Select a subject</option>
                        <option value="web">Web</option>
                        <option value="oop">OOP</option>
                        <option value="sda">SDA</option>
                    </select>
                    {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                </div>

                {/* Address */}
                <div className="form-group mb-3">
                    <label className="form-label">Address:</label>
                    <textarea
                    rows={5}
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>

                <button type="submit" className="btn btn-success">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default StudentForm;