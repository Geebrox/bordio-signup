import { gql } from "@apollo/client";

const mutationUserSignUp = gql`
  mutation($userInput: SignupInput!) {
    signup(input: $userInput) {
      id
    }
  }
`;

export { mutationUserSignUp };
