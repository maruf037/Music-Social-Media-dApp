pragma solidity 0.8.10;

contract socialMusic {
    
    struct User {
        bytes32 name;
        uint8 age;
        string state; //A short description of who they are and what they feel.
        string[] musicRecommendations;
        address[] following;
    }

    mapping(address => User) public users;

    //To add a new music recommendation
    function addSong(string memory _songName) public {
        require(bytes(_songName).length > 0 && bytes(_songName).length <= 100);

        users[msg.sender].musicRecommendations.push(_songName);
    }

    //To setup user information
    function setup(bytes32 _name, uint8 _age, string memory _state) public {
        require(_name.length > 0);

        User memory newUser = User(_name, _age, _state,
        users[msg.sender].musicRecommendations, users[msg.sender].following);

        users[msg.sender] = newUser;
    }

    //To follow new users
    function follow(address _user) public {
         require(_user != address(0));

         users[msg.sender].following.push(_user);       
    }
}
