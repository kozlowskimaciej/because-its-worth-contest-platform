import React, { createContext, useContext, useRef, useState } from "react";

interface PublishContextProps {
  children: React.ReactNode;
}

interface PublishContextValue {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const PublishContext = createContext<PublishContextValue>(
  {} as PublishContextValue
);

export const usePublishContext = () => useContext(PublishContext);

export const PublishContextProvider = ({ children }: PublishContextProps) => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <PublishContext.Provider
      value={{
        files,
        setFiles,
      }}
    >
      {children}
    </PublishContext.Provider>
  );
};

export default PublishContextProvider;
