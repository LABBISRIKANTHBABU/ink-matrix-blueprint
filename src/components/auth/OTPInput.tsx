import { Label } from '@/components/ui/label';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
}

const OTPInput = ({ value, onChange }: OTPInputProps) => {
  return (
    <div className="space-y-2">
      <Label>Enter OTP</Label>
      <p className="text-sm text-muted-foreground mb-4">
        We've sent a 6-digit code to your phone
      </p>
      <div className="flex justify-center">
        <InputOTP value={value} onChange={onChange} maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  );
};

export default OTPInput;
