import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const getTimestamp = () => {
  if (typeof window !== 'undefined') {
    return performance.now();
  }
  // Use Node.js process.hrtime() for server-side
  const [seconds, nanoseconds] = process.hrtime();
  return seconds * 1000 + nanoseconds / 1000000;
};

interface RequestConfig extends AxiosRequestConfig {
  enabled?: boolean;
  onSuccess?: (data: any, timing: number) => void;
  onError?: (error: Error) => void;
}

interface RequestState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  timing: number | null;
}

export function useRequest<T = any>(url: string, config: RequestConfig = {}) {
  const { enabled = true } = config;
  const [state, setState] = useState<RequestState<T>>({
    data: null,
    loading: enabled,
    error: null,
    timing: null
  });

  const [shouldRefetch, setShouldRefetch] = useState(0);

  // Fetch data
  useEffect(() => {
    if (!enabled) {
      return;
    }

    let mounted = true;
    const startTime = getTimestamp();

    const fetchData = async () => {
      try {
        const { onSuccess, onError, ...axiosConfig } = config;
        const response = await axios(url, axiosConfig);
        const endTime = getTimestamp();
        const timing = Math.round(endTime - startTime);

        if (mounted) {
          setState({
            data: response.data,
            loading: false,
            error: null,
            timing
          });
          onSuccess?.(response.data, timing);
        }
      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error('An error occurred');
        if (mounted) {
          setState({
            data: null,
            loading: false,
            error: errorObj,
            timing: null
          });
          config.onError?.(errorObj);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [url, shouldRefetch, enabled]);

  // Mutation function for POST, PUT, DELETE
  const execute = async (mutationConfig: RequestConfig = {}) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    const startTime = getTimestamp();

    try {
      const { onSuccess, onError, ...axiosConfig } = {
        ...config,
        ...mutationConfig
      };

      const response = await axios(url, axiosConfig);
      const endTime = getTimestamp();
      const timing = Math.round(endTime - startTime);

      setState({
        data: response.data,
        loading: false,
        error: null,
        timing
      });

      // Call success handler if provided
      onSuccess?.(response.data, timing);
      
      // Trigger a refetch of the data
      setShouldRefetch(prev => prev + 1);
      
      return response.data;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('An error occurred');
      
      setState({
        data: null,
        loading: false,
        error: errorObj,
        timing: null
      });

      mutationConfig.onError?.(errorObj);
      
      throw error;
    }
  };

  const refresh = () => {
    setShouldRefetch(prev => prev + 1);
  };

  return {
    ...state,
    execute,
    refresh
  };
}
