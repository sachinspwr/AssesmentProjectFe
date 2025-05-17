
import React, { useState,useEffect } from 'react';
import { FormFields, FormFieldData } from '@types';
import { MdComment } from 'react-icons/md';
import { useMutation } from 'react-query';
import { apiService } from '@services/api.service';
import toast from 'react-hot-toast';
import { ApiResponse } from '@dto/response';
import { useNavigate, useLocation} from 'react-router-dom';
import { Button, TextArea } from '@components/atoms';
import { Rating, Checkbox } from '@components/molecules';
import { tokenService } from '@services/token.service';
import { Label } from '@components/atoms';

const FeedbackFormConfig: FormFields[] = [
  {
    name: 'clarityOfQuestions',
    label: 'Clarity of Questions (1-5)',
    type: 'number',
    required: true,
    placeholder: 'Rate the clarity of questions',
  },
  {
    name: 'overallExperience',
    label: 'Overall Experience (1-5)',
    type: 'number', // custom if you're rendering it differently
    required: true,
    placeholder: 'Rate the overall experience',
  },
  {
    name: 'recommendationsForImprovement',
    label: 'Recommendations for Improvement',
    type: 'text-area',
    fieldWith: 'icon',
    icon: MdComment,
    required: false,
    placeholder: 'Provide any suggestions for improvement',
  },
  {
    name: 'followUpRequested',
    label: 'Follow-up Requested',
    type: 'checkbox',
    required: false,
  },
  {
    name: 'isPublic',
    label: 'Mark As Public',
    type: 'checkbox',
    required: false,
  },
];

type FeedbackFormProps = {
  className?: string;
  
};

function FeedbackForm({ className }: FeedbackFormProps) {
    const location = useLocation();
    const testId = location.state?.testId;

  const [rating, setRating] = useState(0);
  const [clarity, setClarity] = useState(0);
  const [experience, setExperience] = useState(0);
  const [recommendations, setRecommendations] = useState('');
  const [followUp, setFollowUp] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const navigate = useNavigate();

   // Fetch userId on component mount
   useEffect(() => {
    const id = tokenService.getValueFromToken('id');
    setUserId(id as string);
  }, []);

  const { mutate, isLoading } = useMutation<ApiResponse, Error, FormFieldData>(
    async (data) => await apiService.post<ApiResponse>('/test/feedback', data),
    {
      onSuccess: (res: ApiResponse, variables) => {
        toast.success(res.message);
        navigate('/test-runner/sign-off'); 
      },
    }
  );

  const handleFeedbackSubmit = () => {
    if (!testId || !userId) {
      toast.error('Test ID or User ID is missing.');
      return;}
      
    const formData = {
        userId,
        testId,
      clarityOfQuestions: clarity.toString(), // number
      overallExperience: experience.toString(), // number
      recommendationsForImprovement: recommendations, // string
      followUpRequested: followUp, // boolean
      isPublic: isPublic, // boolean
      rating: rating.toString(),
    };
  
    // Cast formData to FormFieldData
    mutate(formData as FormFieldData); 
  };


  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <div className="flex flex-col items-center gap-6 py-6 px-10 bg-white shadow-lg rounded-md">
        <h2 className="text-4xl font-bold text-center mb-6">Feedback Form</h2>
        <div className="w-full space-y-6">
          {/* Rate the Test */}
          <div className="flex flex-col items-center">
          <Label className="mb-2">Rate the Test (1-5)</Label>
            <Rating starvalue={rating} onChange={(value) => setRating(value)} />
          </div>

          {/* Clarity of Questions */}
          <div className="flex flex-col items-center">
          <Label className="mb-2">Clearity of Questions (1-5)</Label>
            <Rating starvalue={clarity} onChange={(value) => setClarity(value)} />
            </div>
          

          {/* Overall Experience */}
          <div className="flex flex-col items-center">
          <Label className="mb-2">Overall Experience(1-5)</Label>
            <Rating starvalue={experience} onChange={(value) => setExperience(value)} />
            </div>
         

          {/* Recommendations for Improvement */}
          <div className="flex flex-col mb-4">
          <Label className="mb-2" htmlFor='recommendationsForImprovement'>Recommendations for Improvement</Label>
            <TextArea
              name="recommendationsForImprovement"
              rows={4}
              placeholder="Provide any suggestions for improvement"
              value={recommendations}
              onChange={(value) => setRecommendations(value)}
            />
          </div>

          {/* Follow-up Request & Is Public */}
          <Checkbox
            label="Follow-up Requested"
            name="followUpRequested"
            value="followUpRequested"
            checked={followUp}
            onChange={(value, e, checked) => setFollowUp(checked || false)}
          />

          {/* Mark As Public */}
          <Checkbox
            label="Mark As Public"
            name="isPublic"
            value="isPublic"
            checked={isPublic}
            onChange={(value, e, checked) => setIsPublic(checked || false)}
          />

        
          <Button
            onClick={handleFeedbackSubmit}
            varient="fill"
            label={isLoading ? 'Submitting...' : 'Submit Feedback'}
            isLoading={isLoading}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export { FeedbackForm };
