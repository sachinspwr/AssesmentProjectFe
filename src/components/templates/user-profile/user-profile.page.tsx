import { apiService } from '@services/api.service';
import { tokenService } from '@services/token.service';
import { Card, Loader } from '@components/molecules';
import { UserResponseDTO } from '@dto/response';
import { useQuery } from 'react-query';

function UserProfile() {
  const { data: userData, isLoading } = useQuery<UserResponseDTO, Error>(
    ['user', 'loggedIn'],
    async () => await apiService.get<UserResponseDTO>(`users/${tokenService.getValueFromToken('id')}`),
    {
      staleTime: 60000,
      cacheTime: 300000,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="relative max-w-7xl mx-auto p-8 ">
      <div className="flex flex-col justify-around md:flex-row gap-8">
        <div className="flex justify-center items-center gap-2">
          <div className=" flex flex-col justify-center items-center text-center md:text-left">
            <img
              src="/src/assets/images/user-profile.image.jpg"
              alt={`${userData?.firstName} ${userData?.lastName}`}
              className="rounded-full w-48 h-48 mx-auto md:mx-0 mb-4 object-cover"
            />
            <h2 className="text-3xl font-bold text-black">{`${userData?.firstName} ${userData?.lastName}`}</h2>
            <p className="text-xl text-gray-600 mb-4">{userData?.companyRole}</p>

            <div className="w-full p-6 flex flex-col gap-3 text-lg bg-skin-theme rounded-lg ">
              <h3 className="text-lg font-bold mb-2 text-black">Personal Information</h3>
              <p className="text-gray-700 mb-1">
                <strong>Email:</strong> {userData?.email}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Mobile:</strong> {userData?.mobile}
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> India
              </p>
              <p className="text-gray-700">
                <strong>Birthdate:</strong>{' '}
                {userData?.dateOfBirth && new Date(userData?.dateOfBirth).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="md:w-2/3 mt-8 md:mt-0">
          <div className="space-y-8 p-4">
            <Card className="shadow-sm border-none">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">About Me</h3>
                <a href="#" className="text-blue-500">
                  + Edit
                </a>
              </div>
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae tortor ullamcorper, ut
                vestibulum velit convallis. Aenean posuere risus non velit egestas suscipit. Nunc finibus vel ante id
                euismod. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam
                erat volutpat. Nulla vulputate pharetra tellus, in luctus risus rhoncus id.
              </p>
            </Card>

            <Card className="shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">My Assessment</h3>
                <a href="#" className="text-blue-500">
                  Get Assessment
                </a>
              </div>
              <p>You have not any pending Assessment.</p>
            </Card>
            <Card className="shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Work Experience</h3>
                <a href="#" className="text-blue-500">
                  + Add Work Experience
                </a>
              </div>
              <p>Add your work experience. Don't forget to add those internships as well.</p>
            </Card>

            <Card className="shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Education</h3>
                <a href="#" className="text-blue-500">
                  + Add Education
                </a>
              </div>
              <p>We believe in skills over pedigree; but go ahead add your education for the recruiters who don't.</p>
            </Card>
          </div>
        </div>
      </div>

      {isLoading && <Loader type="local" wrapperClasses="absolute min-h-20 " bubbleClasses="bg-skin-theme-invert" />}
    </div>
  );
}

export { UserProfile };
