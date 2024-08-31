import { useToast } from '@chakra-ui/react';

export const useCustomToast = () => {
    const toast = useToast();

    const showToast = ({ title, description, status }: { title: string, description: string, status: "info" | "warning" | "success" | "error" | "loading" | undefined }) => {
        toast({
            title,
            description,
            status,
            duration: 4000,
            isClosable: true,
            position: 'top-right',
        });
    };

    return { showToast };
};
