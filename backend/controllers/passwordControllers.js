import supaBase from "../config/supaBase.js";



export const createpassword = async (req, res) => {
    try {
        const { website, username, password } = req.body;

        const { data, error } = await supaBase
            .from("password")
            .insert([
                {
                    website,
                    username,
                    password
                }
            ]);

        if (error) {
            throw error;
        }

        res.json({
            success: true,
            data,
            message: "Password created"
        });

    } catch (err) {
        res.json({
            success: false,
            error: err.message
        });
    }
};
export const getpassword = async (req, res) => {
    try {
        const { data, error } = await supaBase
            .from("password")
            .select("*")

        if (error) {
            throw error;
        }
        res.json({
            message: data
        })
    } catch (error) {
        res.json({
            success: false,
            error: err
        })
    }
}
export const deletepassword = async (req, res) => {
    try {
        const { id } = req.params
        const { data, error } = await supaBase
            .from("password")
            .delete()
            .eq("id", id)

        if (error) {
            throw error;
        }
        res.json({
            message: 'the password with id: ${id} deleted',
            data
        })
    } catch (error) {
        res.json({
            success: false,
            error: err
        })
    }
}
export const updatepassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { website, username, password } = req.body;

        const { data, error } = await supaBase
            .from("password")
            .update({
                website,
                username,
                password
            })
            .eq("id", id);

        if (error) {
            throw error;
        }

        res.json({
            success: true,
            message: `The password with id ${id} updated`,
            data
        });

    } catch (error) {
        res.json({
            success: false,
            error: error.message
        });
    }
};