
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { UserRole } from '@/types';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      toast({
        title: 'Login successful',
        description: 'Welcome back to the Campus Staff Portal',
      });
      
      // Navigate to the appropriate dashboard based on user role
      navigate('/dashboard');
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: error || 'Invalid email or password',
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login to Campus Staff Portal</CardTitle>
        <CardDescription>
          Enter your credentials to access your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@campus.edu"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <a 
                href="/reset-password" 
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-muted-foreground text-center">
          For demo purposes, you can use the following accounts:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs w-full">
          <div className="bg-muted p-2 rounded">
            <strong>Admin:</strong> admin@campus.edu<br />
            <strong>Password:</strong> admin123
          </div>
          <div className="bg-muted p-2 rounded">
            <strong>Dean:</strong> dean@campus.edu<br />
            <strong>Password:</strong> dean123
          </div>
          <div className="bg-muted p-2 rounded">
            <strong>Teacher:</strong> teacher@campus.edu<br />
            <strong>Password:</strong> teacher123
          </div>
          <div className="bg-muted p-2 rounded">
            <strong>Registrar:</strong> registrar@campus.edu<br />
            <strong>Password:</strong> registrar123
          </div>
          <div className="bg-muted p-2 rounded col-span-1 md:col-span-2 md:mx-auto">
            <strong>Librarian:</strong> librarian@campus.edu<br />
            <strong>Password:</strong> library123
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
