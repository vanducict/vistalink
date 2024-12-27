import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';

const SUPABASE_URL = 'https://qhbrgsdsduukgmehrqzd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoYnJnc2RzZHV1a2dtZWhycXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzMDIyNjUsImV4cCI6MjA1MDg3ODI2NX0.M9Kg4zUUwIgsGhhA32FPNGGjBCF3b0JWg2EiJtKasyk';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {

    auth: {
        storage: AsyncStorage, // Required for React Native
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

export default supabase;
