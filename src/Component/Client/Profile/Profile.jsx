import React from 'react';

function Profile(props) {
    return (
        <div className="container m-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white">
                    <h2 className="text-center">User Profile</h2>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4 text-center">
                            {/* Placeholder for profile image */}
                            <img 
                                src="https://via.placeholder.com/150" 
                                alt="Profile" 
                                className="rounded-circle img-fluid mb-3"
                            />
                            <h4>{props.name || 'John Doe'}</h4>
                            <p className="text-muted">{props.jobTitle || 'Software Engineer'}</p>
                        </div>
                        <div className="col-md-8">
                            <h5>About Me</h5>
                            <p>
                                {props.about || 
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.'}
                            </p>
                            <h5>Contact Information</h5>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <strong>Email:</strong> {props.email || 'johndoe@example.com'}
                                </li>
                                <li className="list-group-item">
                                    <strong>Phone:</strong> {props.phone || '+1 234 567 890'}
                                </li>
                                <li className="list-group-item">
                                    <strong>Address:</strong> {props.address || '123 Main Street, City, Country'}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card-footer text-center">
                    <button className="btn btn-primary">Edit Profile</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
